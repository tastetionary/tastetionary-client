'use client';

import IC_MAP from '@/assets/common/map.svg';
import IC_REVIEW from '@/assets/common/review.svg';
import MainButton from '@/components/Button/MainButton';
import RefreshButton from '@/components/Button/RefreshButton';
import CBarGraph from '@/components/c-bar-graph';
import CHeader from '@/components/c-header';
import { KeywordBtn } from '@/components/c-select-keyword/page.styled';
import CSelectSection from '@/components/c-select-section';
import { getMoneyValue } from '@/utils';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import * as S from './page.styled';

export default function SelectRestaurantResult() {
  const router = useRouter();

  const [imageUrl, setImageUrl] = useState<string[]>([]);
  const [price, setPrice] = useState<{ portion: number; rank: string }[]>([]);
  const [averagePrice, setAveragePrice] = useState(0);

  const restaurant = '오복수산 판교점';

  useEffect(() => {
    const getImage = async () => {
      const res = await axios.get(`/search-image-api?query=${restaurant}`, {
        headers: {
          'X-Naver-Client-Id': process.env.NEXT_PUBLIC_NAVER_CLIENT_ID,
          'X-Naver-Client-Secret': process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET,
        },
      });

      if (res?.data?.total >= 100) {
        setImageUrl([res?.data?.items?.[0]?.link, res?.data?.items?.[1]?.link, res?.data?.items?.[2]?.link]);
      } else {
        setImageUrl([]);
      }
    };

    if (restaurant && restaurant?.length > 0) {
      getImage();
    }
  }, [restaurant]);

  useEffect(() => {
    const price = {
      0: 5,
      1: 10,
      2: 10,
      3: 7,
      4: 2,
    };

    const values = Object.values(price);

    const total = values.reduce((a, b) => a + b); // 가격 개수

    const assignRanks = (arr: number[]) => {
      // 각 원소의 값을 인덱스와 함께 저장하는 배열을 생성
      var indexedArr = arr.map((value, index) => {
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

    const result: { portion: number; rank: string }[] = [];
    const ranks: string[] = assignRanks(values);

    ranks?.forEach((r, i) => {
      result.push({
        portion: (values[i] / total) * 100,
        rank: r,
      });
    });

    console.log(result);

    setPrice(result);

    // 각 가격과 수량을 배열로 표현
    const prices = [10000, 11000, 12000, 13000, 14000];

    // 총 돈의 양
    let totalMoney = 0;
    for (let i = 0; i < prices.length; i++) {
      totalMoney += prices[i] * values[i];
    }

    // 평균 값
    const averagePrice = Math.round(totalMoney / total);

    setAveragePrice(averagePrice);
  }, []);

  return (
    <>
      <CHeader title="식당 추첨 결과" isBackBtn />

      <S.ResultContainer>
        <S.ResultLabel>조건에 맞는 ##개의 식당 중에서 오늘 점심은...</S.ResultLabel>
        <S.ResultValue>{restaurant}</S.ResultValue>
      </S.ResultContainer>

      <S.AddressContainer>
        <FlexBox>
          <IC_MAP width={12} height={12} />
          <S.AddressText>성남시 분당구 분당내곡로 131 판교테크원 2층 3호</S.AddressText>
        </FlexBox>

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
          <S.MapText>리뷰 N건</S.MapText>
        </S.FlexBox>

        <S.MapText>리뷰 자세히 보기 &gt;</S.MapText>
      </S.ReviewContainer>

      <CSelectSection title="리뷰 키워드">
        <S.ReviewKeywordContainer>
          <KeywordBtn as="div">깨끗해요✨</KeywordBtn>
          <KeywordBtn as="div">친절해요💕</KeywordBtn>
          <KeywordBtn as="div">분위기 좋아요🍷</KeywordBtn>
          <KeywordBtn as="div">가성비 좋아요👍</KeywordBtn>
        </S.ReviewKeywordContainer>
      </CSelectSection>

      <CSelectSection title="인당 메뉴 가격" value={getMoneyValue(averagePrice)}>
        <S.PriceGraphContainer>
          {price?.map((p, i) => {
            const label =
              i === 0 ? '~10,000원' : i === 1 ? '11,000원' : i === 2 ? '12,000d원' : i === 3 ? '13,000원' : '13,000원~';

            return (
              <S.PriceGraphItem key={i}>
                <S.PriceGraphLabel>{label}</S.PriceGraphLabel>
                <CBarGraph $trackRank={p.rank} $trackWidth={p.portion} />
              </S.PriceGraphItem>
            );
          })}
        </S.PriceGraphContainer>
      </CSelectSection>

      <CSelectSection title="재방문 의사율" value="80%">
        <div />
      </CSelectSection>

      <MainButton btnText="다시 추첨하기" onClick={() => router.push('/select-restaurant')} />

      <S.ButtonsContainer>
        <RefreshButton btnText="조건 재설정" onClick={() => router.push('/select-restaurant')} />

        <S.ButtonDivider />

        <RefreshButton btnText="이 식당 제외" iconType="except" />
      </S.ButtonsContainer>
    </>
  );
}
