import { FoodRecommendRes, postFoodRecommend } from '@/apis/food/recommend';
import { RestaurantRecommendRes, postRestaurantRecommend } from '@/apis/restaurant/recommend';
import { selectFoodState, selectRestaurantState, selectResultState } from '@/lib/atom';
import { FoodCategory, FoodKeyword } from '@homekeeper89/taste_dict/lib/domain/food/food.enum';
import { RestaurantCategory } from '@homekeeper89/taste_dict/lib/domain/restaurant/restaurant.enum';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import MainButton, { MainButtonProps } from '../Button/MainButton';
import { MODAL_TYPES } from '../Modal/GlobalModal';
import useModal from '../Modal/GlobalModal/hooks/useModal';

interface Props extends MainButtonProps {
  selectType: 'food' | 'restaurant';
}

export default function CRecommendButton({ selectType, btnText, ...rest }: Props) {
  const router = useRouter();
  const { openModal, closeModal } = useModal();

  const foodState = useRecoilValue(selectFoodState);
  const restaurantState = useRecoilValue(selectRestaurantState);
  const setResult = useSetRecoilState(selectResultState);

  const token = process.env.NEXT_PUBLIC_ACCESS_TOKEN;

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

  const loadingModal = (res: FoodRecommendRes | RestaurantRecommendRes) => {
    openModal(MODAL_TYPES.loading, {
      handleClose: () => {
        if (selectType === 'food') {
          setResult({
            food: {
              name: res?.name,
            },
          });
        } else {
          setResult({
            restaurant: {
              name: res?.name,
              latitude: 33.450701, // res?.latitude,
              longitude: 126.570667, // res?.longitude,
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
