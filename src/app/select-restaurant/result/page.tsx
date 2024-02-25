'use client';

import IC_MAP from '@/assets/common/map.svg';
import IC_REVIEW from '@/assets/common/review.svg';
import RefreshButton from '@/components/Button/RefreshButton';
import CBarGraph from '@/components/c-bar-graph';
import CHeader from '@/components/c-header';
import CRecommendButton from '@/components/c-recommend-button';
import { KeywordBtn } from '@/components/c-select-keyword/page.styled';
import CSelectSection from '@/components/c-select-section';
import { useSelectResultStore } from '@/store/useSelectResultStore';
import { getMoneyValue } from '@/utils';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import * as S from './page.styled';

export default function SelectRestaurantResult() {
  const router = useRouter();

  const [address, setAddress] = useState('');
  const [imageUrl, setImageUrl] = useState<string[]>([]);
  const [price, setPrice] = useState<{ portion: number; rank: string; label: number }[]>([]);

  const { restaurant } = useSelectResultStore();
  const restaurantName = restaurant?.name;
  const lat = restaurant?.latitude;
  const lng = restaurant?.longitude;
  const review = restaurant?.review;

  const uniqueReviewKeyword = review?.keywords?.filter((k, i) => review?.keywords.indexOf(k) === i);

  useEffect(() => {
    const getImage = async () => {
      const needDistrict = !restaurantName?.includes(' ');
      const district = address?.split(' ')?.[1];

      const res = await axios.get(
        `/search-image-api?query=${needDistrict && district ? `${district} ${restaurantName}` : restaurantName}`,
        {
          headers: {
            'X-Naver-Client-Id': process.env.NEXT_PUBLIC_NAVER_CLIENT_ID,
            'X-Naver-Client-Secret': process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET,
          },
        }
      );

      if (res?.data?.total >= 15) {
        setImageUrl([res?.data?.items?.[0]?.link, res?.data?.items?.[1]?.link, res?.data?.items?.[2]?.link]);
      } else {
        setImageUrl([]);
      }
    };

    if (restaurantName && restaurantName?.length > 0 && address !== '') {
      getImage();
    }
  }, [restaurant, address]);

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

  return (
    <>
      <CHeader title="식당 추첨 결과" isBackBtn />

      <S.ResultContainer>
        <S.ResultValue>{restaurantName}</S.ResultValue>
      </S.ResultContainer>

      <S.AddressContainer>
        <S.FlexBox>
          <IC_MAP width={12} height={12} />
          <S.AddressText>{address}</S.AddressText>
        </S.FlexBox>

        <S.MapText>지도 보기 &gt;</S.MapText>
      </S.AddressContainer>

      <S.ImageContainer>
        <S.ImageItem $bgUrl={imageUrl[0]}></S.ImageItem>
        <S.ImageItem $bgUrl={imageUrl[1]}></S.ImageItem>
        <S.ImageItem $bgUrl={imageUrl[2]}></S.ImageItem>
      </S.ImageContainer>

      <S.ReviewContainer>
        <S.FlexBox>
          <IC_REVIEW width={12} height={12} />
          <S.MapText>리뷰 {review?.total ?? 'N'}건</S.MapText>
        </S.FlexBox>

        <S.MapText>리뷰 자세히 보기 &gt;</S.MapText>
      </S.ReviewContainer>

      <CSelectSection title="리뷰 키워드">
        <S.ReviewKeywordContainer>
          {uniqueReviewKeyword?.map((k, i) => (
            <KeywordBtn as="div" key={i}>
              {k}
            </KeywordBtn>
          ))}
        </S.ReviewKeywordContainer>
      </CSelectSection>

      <CSelectSection title="인당 메뉴 가격" value={getMoneyValue(Math.round(review?.aggregatePrice?.avg ?? 0))}>
        <S.PriceGraphContainer>
          {price?.map((p, i) => {
            return (
              <S.PriceGraphItem key={i}>
                <S.PriceGraphLabel>
                  {i === 0 && '~'}
                  {getMoneyValue(p?.label)}
                  {i > 0 && i === price?.length - 1 && '~'}
                </S.PriceGraphLabel>
                <CBarGraph $trackRank={p.rank} $trackWidth={p.portion} />
              </S.PriceGraphItem>
            );
          })}
        </S.PriceGraphContainer>
      </CSelectSection>

      <CSelectSection title="재방문 의사율" value={`${review?.revisitRatio ?? 0}%`}>
        <div />
      </CSelectSection>

      <CRecommendButton btnText="다시 추첨하기" selectType="restaurant" />

      <S.ButtonsContainer>
        <RefreshButton btnText="조건 재설정" onClick={() => router.push('/select-restaurant')} />

        <S.ButtonDivider />

        <RefreshButton btnText="이 식당 제외" iconType="except" />
      </S.ButtonsContainer>
    </>
  );
}
