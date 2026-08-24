'use client';

import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { usePathname, useRouter } from 'next/navigation';
import { enumValuesToKeys } from './utils';
import { FoodRecommendRes, postFoodRecommend } from '@/features/recommendation/api/food/recommend';
import { RestaurantRecommendRes, postRestaurantRecommend } from '@/features/recommendation/api/restaurant/recommend';
import { useSelectFoodStore } from '@/features/recommendation/store/useSelectFoodStore';
import { useSelectRestaurantStore } from '@/features/recommendation/store/useSelectRestaurantStore';
import { useSelectResultStore } from '@/features/recommendation/store/useSelectResultStore';
import useRegion from '@/features/region/hooks/useRegion';
import useUser from '@/shared/hooks/useUser';
import { FoodCategory, FoodKeyword, RestaurantCategory } from '@/shared/types/enums';
import DefaultButton from '@/shared/ui/Button/DefaultButton';
import { MainButtonProps } from '@/shared/ui/Button/MainButton';
import { MODAL_TYPES } from '@/shared/ui/Modal/GlobalModal';
import useModal from '@/shared/ui/Modal/GlobalModal/hooks/useModal';

interface Props extends MainButtonProps {
  selectType: 'food' | 'restaurant' | 'home';
}

export default function CRecommendButton({ selectType, btnText, ...rest }: Props) {
  const router = useRouter();
  const { token } = useUser();
  const { latitude, longitude, hasRegion } = useRegion();
  const { openModal, closeModal } = useModal();
  const pathname = usePathname();

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

  const regionRequiredModal = () => {
    openModal(MODAL_TYPES.dialog, {
      title: '지역 설정이 필요합니다.',
      message: '식당 추첨을 위해 먼저 지역을 설정해주세요.',
      confirmText: '지역 설정하기',
      cancelText: '취소',
      needClose: true,
      handleClose: () => closeModal(MODAL_TYPES.dialog),
      handleConfirm: () => router.push('/select-restaurant/region-setting'),
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
        if (selectType === 'food') {
          if (!res) {
            setTimeout(() => {
              openModal(MODAL_TYPES.dialog, {
                title: '추첨 가능한 메뉴가 없어요.',
                message: '다른 조건으로 다시 시도해 보세요!',
                handleConfirm: () => {
                  router.push('/select-menu');
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

          goScrollToTop();

          // 한글 값 대신 짧은 enum 키로 축약해 공유 URL 길이를 줄인다. (카카오 공유 메시지 크기 제한 대응)
          const params = new URLSearchParams({
            category: enumValuesToKeys(
              FoodCategory,
              foodCategory.filter(c => c !== '전체')
            ).join(','),
            keyword: enumValuesToKeys(
              FoodKeyword,
              foodKeyword.filter(c => c !== '전체')
            ).join(','),
            id: String(res.id),
            name: res.name,
          });

          return router.push(`/select-menu/result-share?${params.toString()}`);
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
    mutationFn: () =>
      postFoodRecommend(
        {
          categories: foodCategory?.filter(c => c !== '전체') as FoodCategory[],
          keywords: foodKeyword?.filter(c => c !== '전체') as FoodKeyword[],
        },
        token
      ),
    onSuccess: res => loadingModal(res),
    onError: err => {
      if (err?.response?.status === 401) {
        return loginModal();
      }
    },
  });

  const { mutate: restaurantRecommend } = useMutation<RestaurantRecommendRes, AxiosError>({
    mutationFn: () =>
      postRestaurantRecommend(
        {
          category: restaurantCategory?.filter(c => c !== '전체') as RestaurantCategory[],
          keywords: restaurantKeyword?.filter(c => c !== '전체'),
          prices: restaurantPrices,
          excludeIds: [],
          latitude,
          longitude,
        },
        token
      ),
    onSuccess: res => loadingModal(res),
    onError: err => {
      if (err?.response?.status === 401) {
        return loginModal();
      }
    },
  });

  const onButtonClick = () => {
    if (selectType === 'home') {
      router.push('/select-menu');
      return;
    }

    // 식당 추첨은 지역 좌표가 필요하므로 미설정 시 지역 설정으로 유도한다.
    if (selectType === 'restaurant' && !hasRegion) {
      return regionRequiredModal();
    }

    if (selectType === 'food') return foodRecommend();

    if (selectType === 'restaurant') return restaurantRecommend();
  };

  return (
    <DefaultButton bgColor="yellow" customStyle="flex-grow py-12" {...rest} onClick={() => onButtonClick()}>
      <span className="body1 text-white">{btnText}</span>
    </DefaultButton>
  );
}
