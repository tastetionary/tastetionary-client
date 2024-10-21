'use client';

import IC_LOCATION from '@/assets/common/Icons/location.svg';
import IC_PRICE from '@/assets/common/Icons/price.svg';
import IC_REVIEW2 from '@/assets/common/Icons/review.svg';

import preferenceRepository from '@/apis/user/preference';
import BottomButtonContainer from '@/components/Button/BottomButtonContainer';
import DefaultButton from '@/components/Button/DefaultButton';
import CHeader from '@/components/c-header';
import CRecommendButton from '@/components/c-recommend-button';
import { MODAL_TYPES } from '@/components/Modal/GlobalModal';
import useModal from '@/components/Modal/GlobalModal/hooks/useModal';
import { iconToast } from '@/components/Toast';
import useUser from '@/hooks/useUser';
import { useSelectResultStore } from '@/store/useSelectResultStore';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import RestaurantDetail from './components/RestaurantDetail';
import RestaurantImages from './components/RestaurantImages';
import RestaurantReview from './components/RestaurantReview';

export default function SelectRestaurantResult() {
  const { token } = useUser();
  const { openModal, closeModal } = useModal();

  const [location, setLocation] = useState('');
  const [address, setAddress] = useState('');

  const { restaurant } = useSelectResultStore();

  const restaurantName = restaurant?.name;
  const lat = restaurant?.latitude;
  const lng = restaurant?.longitude;
  const review = restaurant?.review;

  const maxPrice = restaurant?.review?.priceList.reduce(
    (acc, item) => {
      const [key, value] = Object.entries(item)[0];
      return value >= acc.maxValue ? { maxKey: key, maxValue: value } : acc;
    },
    { maxKey: '', maxValue: -Infinity }
  ).maxKey;

  const maxPriceText: { [key: string]: string } = {
    '~10,000': '10,000원 이하',
    '10,000~13,000': '10,000원 ~ 13,000원',
    '13,000~16,000': '13,000원 ~ 16,000원',
    '16,000~20,000': '16,000원 ~ 20,000원',
    '20,000~': '20,000원 이상',
  };

  const { mutate: excludedRestaurant } = useMutation(preferenceRepository().postPreference, {
    onSuccess: () => {
      iconToast('이 식당은 앞으로 제외됩니다.', 'check');
    },
  });

  const excludeModal = () => {
    openModal(MODAL_TYPES.dialog, {
      title: '이 식당 제외하기',
      message: '앞으로도 이 식당이 나타나지 않도록 제외할까요?',
      handleConfirm: () =>
        excludedRestaurant({ category: 'excluded', restaurantId: restaurant?.id ? +restaurant?.id : 0, token: token! }),
      cancelText: '닫기',
      confirmText: '추천하지 않기',
      handleClose: () => closeModal(MODAL_TYPES.dialog),
      needClose: true,
    });
  };

  useEffect(() => {
    const getAddress = async () => {
      const res = await axios.get(`https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lng}&y=${lat}`, {
        headers: {
          Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
        },
      });

      const data = res?.data?.documents?.[0];

      if (data) {
        setAddress(data?.road_address?.address_name ?? data?.address?.address_name);
        setLocation(data?.address?.region_3depth_name);
      }
    };

    if (lat && lng) {
      getAddress();
    }
  }, [lat, lng]);

  return (
    <>
      <CHeader title="식당 고르기" />

      <RestaurantImages address={address} />

      <div className="px-xl pb-xl pt-lg">
        <div className="flex items-center gap-xs">
          <span className="body2 text-neutral-bg60">{location}</span>
        </div>

        <h3 className="title2 mt-xs font-bold">{restaurantName}</h3>

        <div className="mt-md flex flex-col gap-xs">
          <div className="flex items-center gap-xs">
            <IC_LOCATION width={16} height={16} />

            <span className="body2 text-neutral-bg60">{address}</span>
          </div>

          <div className="flex items-center gap-xs">
            <IC_PRICE width={16} height={16} />

            <span className="body2 text-neutral-bg60">가격대 {maxPrice ? maxPriceText[maxPrice] : ''}</span>
          </div>

          <div className="flex items-center gap-xs">
            <IC_REVIEW2 width={16} height={16} />

            <span className="body2 text-neutral-bg60">리뷰 {review?.total}건</span>
          </div>
        </div>

        <div className="mt-md flex gap-xxs">
          {review?.keywords?.map((k, i) => (
            <DefaultButton bgColor="gray" customStyle="py-2 px-8" key={i}>
              <span className="body4">{k}</span>
            </DefaultButton>
          ))}
        </div>
      </div>

      <div className={'mt-lg'}>
        <RestaurantDetail />

        <RestaurantReview />

        <BottomButtonContainer>
          <DefaultButton bgColor="gray" customStyle="px-lg" onClick={excludeModal}>
            <span className="body1">이 식당 제외</span>
          </DefaultButton>

          <CRecommendButton btnText="한번 더 돌리기" selectType="restaurant" />
        </BottomButtonContainer>
      </div>
    </>
  );
}
