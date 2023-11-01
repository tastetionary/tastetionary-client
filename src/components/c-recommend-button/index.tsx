import { FoodRecommendRes, postFoodRecommend } from '@/apis/food/recommend';
import { RestaurantRecommendRes, postRestaurantRecommend } from '@/apis/restaurant/recommend';
import useUser from '@/hooks/useUser';
import { selectFoodState, selectRestaurantState, selectResultState } from '@/lib/atom';
import { FoodCategory, FoodKeyword } from '@homekeeper89/taste_dict/lib/domain/food/food.enum';
import { RestaurantCategory } from '@homekeeper89/taste_dict/lib/domain/restaurant/restaurant.enum';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { usePathname, useRouter } from 'next/navigation';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import MainButton, { MainButtonProps } from '../Button/MainButton';
import { MODAL_TYPES } from '../Modal/GlobalModal';
import useModal from '../Modal/GlobalModal/hooks/useModal';

interface Props extends MainButtonProps {
  selectType: 'food' | 'restaurant';
}

export default function CRecommendButton({ selectType, btnText, ...rest }: Props) {
  const router = useRouter();
  const { token } = useUser();
  const { openModal, closeModal } = useModal();
  const pathname = usePathname();

  const foodState = useRecoilValue(selectFoodState);
  const [restaurantState, setRestaurantState] = useRecoilState(selectRestaurantState);
  const setResult = useSetRecoilState(selectResultState);

  const isResultPage = pathname?.includes('result');

  const testToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN;

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
          setRestaurantState({
            category: [],
            keyword: [],
            price: 0,
          });

          router.push('/select-restaurant');
        },
        handleClose: () => closeModal(MODAL_TYPES.dialog),
        cancelText: '닫기',
        confirmText: '조건 재설정',
        needClose: true,
      });
    }, 500);
  };

  const loadingModal = (res: RestaurantRecommendRes | FoodRecommendRes) => {
    openModal(MODAL_TYPES.loading, {
      handleClose: () => {
        if (!res && selectType === 'restaurant') {
          return noResultModal();
        }

        if (!res && selectType === 'food') {
          return router.push('/select-menu/result');
        }

        if ('aggregateReviews' in res) {
          setResult({
            restaurant: {
              name: res?.name,
              latitude: res?.latitude ?? 33.450701,
              longitude: res?.longitude ?? 126.570667,
              ...(res?.aggregateReviews
                ? {
                    review: {
                      total: res?.aggregateReviews?.totalCount ?? 0,
                      revisitRatio: res?.aggregateReviews?.revisitRatio ?? 0,
                      aggregatePrice: res?.aggregateReviews?.aggregatePrice,
                      keywords: res?.aggregateReviews?.keywords ?? [],
                    },
                  }
                : {}),
            },
          });
        } else {
          setResult({
            food: {
              id: +res?.id ?? 0,
              name: res?.name,
            },
          });
        }

        router.push(selectType === 'food' ? `/select-menu/result` : `/select-restaurant/result`);
      },
    });
  };

  const { mutate: getFood } = useMutation<FoodRecommendRes, AxiosError>(
    () =>
      postFoodRecommend(
        {
          categories: foodState?.category?.filter(c => c !== '전체') as FoodCategory[],
          keywords: foodState?.keyword?.filter(c => c !== '전체') as FoodKeyword[],
        },
        token
      ),
    {
      onSuccess: res => {
        loadingModal(res);
      },
      onError: err => {
        if (err?.response?.status === 401) {
          return loginModal();
        }
      },
    }
  );

  const { mutate: getRestaurant } = useMutation<RestaurantRecommendRes, AxiosError>(
    () =>
      postRestaurantRecommend(
        {
          category: restaurantState?.category?.filter(c => c !== '전체')[0] as RestaurantCategory,
          keywords: restaurantState?.keyword?.filter(c => c !== '전체'),
          price: 10000 + 1000 * restaurantState?.price,
          excludeIds: [],
        },
        process.env.NEXT_PUBLIC_ACCESS_TOKEN
      ),
    {
      onSuccess: res => {
        loadingModal(res);
      },
      onError: err => {
        if (err?.response?.status === 401) {
          return loginModal();
        }
      },
    }
  );

  const onButtonClick = () => {
    if (selectType === 'food') return getFood();

    if (selectType === 'restaurant') return getRestaurant();
  };

  return <MainButton btnText={btnText} {...rest} onClick={() => onButtonClick()} />;
}
