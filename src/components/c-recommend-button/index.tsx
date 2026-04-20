'use client';

import { FoodRecommendRes, postFoodRecommend } from '@/apis/food/recommend';
import { RestaurantRecommendRes, postRestaurantRecommend } from '@/apis/restaurant/recommend';
import { useRewardedAd } from '@/hooks/useRewardedAd';
import useUser from '@/hooks/useUser';
import { useSelectFoodStore } from '@/store/useSelectFoodStore';
import { useSelectRestaurantStore } from '@/store/useSelectRestaurantStore';
import { useSelectResultStore } from '@/store/useSelectResultStore';
import { FoodCategory, FoodKeyword, RestaurantCategory } from '../../types/enums';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { usePathname, useRouter } from 'next/navigation';
import { useRef } from 'react';
import DefaultButton from '../Button/DefaultButton';
import { MainButtonProps } from '../Button/MainButton';
import { MODAL_TYPES } from '../Modal/GlobalModal';
import useModal from '../Modal/GlobalModal/hooks/useModal';
import { toUnicodeEscape } from './utils';

interface Props extends MainButtonProps {
  selectType: 'food' | 'restaurant' | 'home';
}

export default function CRecommendButton({ selectType, btnText, ...rest }: Props) {
  const router = useRouter();
  const { token } = useUser();
  const { openModal, closeModal } = useModal();
  const pathname = usePathname();
  const pendingActionRef = useRef<'food' | 'restaurant' | null>(null);

  const { category: foodCategory, keyword: foodKeyword } = useSelectFoodStore();
  const {
    category: restaurantCategory,
    keyword: restaurantKeyword,
    prices: restaurantPrices,
    resetSelectRestaurant,
  } = useSelectRestaurantStore();
  const { setSelectRestaurantResult } = useSelectResultStore();

  const isResultPage = pathname?.includes('result');

  const goScrollToTop = () => {
    if (typeof window === undefined) return;

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const loginModal = () => {
    openModal(MODAL_TYPES.dialog, {
      title: '인증이 필요합니다.\n로그인을 해주세요.',
      confirmText: '로그인하기',
      cancelText: '취소',
      needClose: true,
      handleClose: () => closeModal(MODAL_TYPES.dialog),
      handleConfirm: () => router.push('/login'),
    });
  };

  const noResultModal = () => {
    setTimeout(() => {
      openModal(MODAL_TYPES.dialog, {
        title: isResultPage ? '더 이상 추첨할 식당이 없어요.' : '선택하신 조건으로 추첨할 식당이 없어요.',
        message: isResultPage
          ? '더 이상 추첨할 식당이 없습니다.\n다른 조건으로 추첨해보세요!'
          : '다른 조건으로 추첨해 보세요!',
        handleConfirm: () => {
          resetSelectRestaurant();

          router.push('/select-restaurant');
        },
        handleClose: () => closeModal(MODAL_TYPES.dialog),
        cancelText: '닫기',
        confirmText: '조건 재설정',
        needClose: true,
      });
    }, 500);
  };

  const loadingModal = (res?: RestaurantRecommendRes | FoodRecommendRes) => {
    openModal(MODAL_TYPES.loading, {
      maxWidth: 120,
      handleClose: () => {
        const unicodeFoodCategory = foodCategory
          .filter(c => c !== '전체')
          .map(c => toUnicodeEscape(c))
          .join(',');
        const unicodeFoodKeyword = foodKeyword
          .filter(c => c !== '전체')
          .map(c => toUnicodeEscape(c.replaceAll("'", '')))
          .join(',');

        const encodedFoodCategory = encodeURIComponent(unicodeFoodCategory);
        const encodedFoodKeyword = encodeURIComponent(unicodeFoodKeyword);

        if (selectType === 'food') {
          if (!res) {
            setTimeout(() => {
              openModal(MODAL_TYPES.dialog, {
                title: '추첨 가능한 메뉴가 없어요.',
                message: '다른 조건으로 다시 시도해 보세요!',
                handleConfirm: () => {
                  const foodBase = pathname?.startsWith('/v2/select-menu') ? '/v2/select-menu' : '/select-menu';
                  router.push(foodBase);
                  closeModal(MODAL_TYPES.dialog);
                },
                handleClose: () => closeModal(MODAL_TYPES.dialog),
                cancelText: '닫기',
                confirmText: '조건 재설정',
                needClose: true,
              });
            }, 500);
            return;
          }

          const encodedFoodId = encodeURIComponent(toUnicodeEscape(res.id + ''));
          const encodedFoodName = encodeURIComponent(toUnicodeEscape(res.name));

          goScrollToTop();

          const foodResultShareBase = pathname?.startsWith('/v2/select-menu')
            ? '/v2/select-menu/result-share'
            : '/select-menu/result-share';

          return router.push(
            `${foodResultShareBase}?category=${encodedFoodCategory}&keyword=${encodedFoodKeyword}&id=${encodedFoodId}&name=${encodedFoodName}`
          );
        }

        if (!res && selectType === 'restaurant') {
          return noResultModal();
        }

        if (res && 'aggregateReviews' in res) {
          setSelectRestaurantResult({
            name: res?.name,
            latitude: res?.latitude ?? 33.450701,
            longitude: res?.longitude ?? 126.570667,
            id: res?.id,
            reviews: res?.reviews,
            bookmark: res?.bookmark,
            ...(res?.aggregateReviews
              ? {
                  review: {
                    total: res?.aggregateReviews?.totalCount ?? 0,
                    revisitRatio: res?.aggregateReviews?.revisitRatio ?? 0,
                    keywords: res?.aggregateReviews?.keywords ?? [],
                    aggregatePrice: res.aggregateReviews.aggregatePrice,
                  },
                }
              : {}),
          });
        }

        goScrollToTop();

        router.push(`/select-restaurant/result`);
      },
    });
  };

  const { mutate: foodRecommend } = useMutation<FoodRecommendRes, AxiosError>({
    mutationFn: () => {
      console.log('[foodRecommend] API 호출 시작');
      return postFoodRecommend(
        {
          categories: foodCategory?.filter(c => c !== '전체') as FoodCategory[],
          keywords: foodKeyword?.filter(c => c !== '전체') as FoodKeyword[],
        },
        token
      );
    },
    onSuccess: res => {
      console.log('[foodRecommend] 성공:', res);
      loadingModal(res);
    },
    onError: err => {
      console.error('[foodRecommend] 에러:', err);
      if (err?.response?.status === 401) {
        return loginModal();
      }
    },
  });

  const { mutate: restaurantRecommend } = useMutation<RestaurantRecommendRes, AxiosError>({
    mutationFn: () => {
      console.log('[restaurantRecommend] API 호출 시작');
      return postRestaurantRecommend(
        {
          category: restaurantCategory?.filter(c => c !== '전체') as RestaurantCategory[],
          keywords: restaurantKeyword?.filter(c => c !== '전체'),
          prices: restaurantPrices,
          excludeIds: [],
        },
        token
      );
    },
    onSuccess: res => {
      console.log('[restaurantRecommend] 성공:', res);
      loadingModal(res);
    },
    onError: err => {
      console.error('[restaurantRecommend] 에러:', err);
      if (err?.response?.status === 401) {
        return loginModal();
      }
    },
  });

  // 광고 보상을 받았을 때 추첨 진행
  const handleAdReward = () => {
    console.log('[handleAdReward] 시작 - selectType:', selectType);

    if (selectType === 'food') {
      console.log('[handleAdReward] foodRecommend 호출 시작');
      foodRecommend();
      console.log('[handleAdReward] foodRecommend 호출 완료');
    } else if (selectType === 'restaurant') {
      console.log('[handleAdReward] restaurantRecommend 호출 시작');
      restaurantRecommend();
      console.log('[handleAdReward] restaurantRecommend 호출 완료');
    } else {
      console.log('[handleAdReward] pendingActionRef가 null이거나 유효하지 않음');
    }
    pendingActionRef.current = null;
    console.log('[handleAdReward] 완료');
  };

  const { isInApp, requestAd } = useRewardedAd(handleAdReward);

  const onButtonClick = () => {
    if (selectType === 'home') {
      router.push('/select-menu');
      return;
    }

    // 앱 환경에서는 광고를 먼저 보여줌
    if (isInApp && (selectType === 'food' || selectType === 'restaurant')) {
      pendingActionRef.current = selectType;
      requestAd();
      return;
    }

    // 웹 환경이거나 앱이 아니면 바로 추첨 진행
    if (selectType === 'food') return foodRecommend();

    if (selectType === 'restaurant') return restaurantRecommend();
  };

  return (
    <DefaultButton bgColor="yellow" customStyle="flex-grow py-12" {...rest} onClick={() => onButtonClick()}>
      <span className="body1 text-white">{btnText}</span>
    </DefaultButton>
  );
}
