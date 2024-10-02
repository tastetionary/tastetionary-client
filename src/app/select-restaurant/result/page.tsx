'use client';

import IC_LOCATION from '@/assets/common/Icons/location.svg';
import IC_PRICE from '@/assets/common/Icons/price.svg';
import IC_REVIEW2 from '@/assets/common/Icons/review.svg';

import BottomButtonContainer from '@/components/Button/BottomButtonContainer';
import DefaultButton from '@/components/Button/DefaultButton';
import CHeader from '@/components/c-header';
import CRecommendButton from '@/components/c-recommend-button';
import { MODAL_TYPES } from '@/components/Modal/GlobalModal';
import useModal from '@/components/Modal/GlobalModal/hooks/useModal';
import ButtonTab from '@/components/Tab/ButtonTab';
import { useSelectResultStore } from '@/store/useSelectResultStore';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import RestaurantDetail from './components/RestaurantDetail';
import RestaurantImages from './components/RestaurantImages';
import RestaurantReview from './components/RestaurantReview';

export default function SelectRestaurantResult() {
  const router = useRouter();
  const { openModal, closeModal } = useModal();

  const [tab, setTab] = useState(0);
  const [address, setAddress] = useState('');
  const [price, setPrice] = useState<{ portion: number; rank: string; label: number }[]>([]);

  const { restaurant } = useSelectResultStore();
  const restaurantName = restaurant?.name;
  const lat = restaurant?.latitude;
  const lng = restaurant?.longitude;
  const review = restaurant?.review;

  const uniqueReviewKeyword = review?.keywords?.filter((k, i) => review?.keywords.indexOf(k) === i);

  const excludeModal = () => {
    openModal(MODAL_TYPES.dialog, {
      title: '이 식당 제외하기',
      message: '앞으로도 이 식당이 나타나지 않도록 제외할까요?',
      handleConfirm: () => closeModal(MODAL_TYPES.dialog),
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
      }
    };

    if (lat && lng) {
      getAddress();
    }
  }, [lat, lng]);

  useEffect(() => {
    const aggregatePrice = review?.aggregatePrice;

    if (aggregatePrice) {
      const { avg, ...others } = aggregatePrice;

      const price = others;

      const keys = Object.keys(price);
      const values = Object.values(price);

      const total = values.reduce((a, b) => a + b); // 가격 개수

      const assignRanks = (arr: number[]) => {
        // 각 원소의 값을 인덱스와 함께 저장하는 배열을 생성
        const indexedArr = arr.map((value, index) => {
          return { value: value, index: index };
        });

        // 원소를 값에 따라 정렬
        indexedArr.sort((a, b) => {
          if (a.value === b.value) {
            return b.index - a.index; // 값이 같을 경우 내림차순
          }
          return a.value - b.value; // 오름차순
        });

        // 순위를 부여할 빈 배열을 생성
        let ranks: string[] = [];

        // 순위 부여
        for (let i = 0; i < arr.length; i++) {
          let rank;
          if (i === 0) {
            rank = 'smallest';
          } else if (i === 1) {
            rank = 'small';
          } else if (i === arr.length - 2) {
            rank = 'large';
          } else if (i === arr.length - 1) {
            rank = 'largest';
          } else {
            rank = 'medium';
          }
          ranks[indexedArr[i].index] = rank;
        }

        return ranks;
      };

      const result: { portion: number; rank: string; label: number }[] = [];
      const ranks: string[] = assignRanks(values);

      ranks?.forEach((r, i) => {
        result.push({
          portion: (values[i] / total) * 100,
          rank: r,
          label: +keys[i],
        });
      });

      setPrice(result);
    }
  }, [review?.aggregatePrice]);

  console.log('restaurant', restaurant);

  return (
    <>
      <CHeader title="식당 고르기" />

      <RestaurantImages address={address} />

      <div className="px-xl pb-xl pt-lg">
        <div className="flex items-center gap-xs">
          <span className="body2 text-neutral-bg60">카테고리</span>
          <span className="body2 text-neutral-bg60">|</span>
          <span className="body2 text-neutral-bg60">위치</span>
        </div>

        <h3 className="title2 mt-xs font-bold">{restaurantName}</h3>

        <div className="mt-md flex flex-col gap-xs">
          <div className="flex items-center gap-xs">
            <IC_LOCATION width={16} height={16} />

            <span className="body2 text-neutral-bg60">{address}</span>
          </div>

          <div className="flex items-center gap-xs">
            <IC_PRICE width={16} height={16} />

            <span className="body2 text-neutral-bg60">가격대</span>
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

      <ButtonTab tabList={['식당 상세', '리뷰']} selectedTab={tab} clickEvent={value => setTab(value)} />

      <div className={tab === 0 ? 'mt-lg px-xl' : 'mt-lg'}>
        {tab === 0 ? (
          <>
            <RestaurantDetail />

            <BottomButtonContainer>
              <DefaultButton bgColor="gray" customStyle="px-lg" onClick={excludeModal}>
                <span className="body1">이 식당 제외</span>
              </DefaultButton>
              <CRecommendButton btnText="다시 추첨하기" selectType="restaurant" />
            </BottomButtonContainer>
          </>
        ) : (
          <>
            <RestaurantReview />

            <BottomButtonContainer style={{ padding: 32 }}>
              <DefaultButton bgColor="orange" customStyle="flex-grow py-12">
                <span className="body1 text-white">리뷰 작성하러 가기</span>
              </DefaultButton>
            </BottomButtonContainer>
          </>
        )}
      </div>
    </>
  );
}
