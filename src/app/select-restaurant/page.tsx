'use client';

import { getRestaurantOption } from '@/apis/restaurant/option';
import RefreshButton from '@/components/Button/RefreshButton';
import CChangeRegion from '@/components/c-change-region';
import CHeader from '@/components/c-header';
import CRecommendButton from '@/components/c-recommend-button';
import CSelectCategory from '@/components/c-select-category';
import CSelectKeyword from '@/components/c-select-keyword';
import CSelectSection from '@/components/c-select-section';
import CSlider from '@/components/c-slider';
import { useSelectRestaurantStore } from '@/store/useSelectRestaurantStore';
import { useQuery } from '@tanstack/react-query';
import * as S from './page.styled';

export default function SelectRestaurant() {
  const { category, keyword, resetSelectRestaurant } = useSelectRestaurantStore();

  const recommendBtnDisabled = category?.length === 0 || keyword?.length === 0;
  const refreshBtnDisabled = category?.length === 0 && keyword?.length === 0;

  const { data } = useQuery(['restaurant-option'], () => getRestaurantOption(), {
    cacheTime: 0,
    staleTime: 0,
  });

  return (
    <>
      <CHeader title="식당 고르기" isBackBtn />

      <CChangeRegion type="dining_area" />

      <S.SectionContainer>
        <CSelectSection title="음식 종류">
          <CSelectCategory data={data?.categories} selectType="restaurant" isDuplicate={false} />
        </CSelectSection>

        <CSelectSection title="키워드" subtitle="(복수 선택 가능)">
          <CSelectKeyword data={data?.keywords} selectType="restaurant" />
        </CSelectSection>

        <CSelectSection title="가격">
          <CSlider markData={data?.prices ?? []} type="restaurant" />
        </CSelectSection>
      </S.SectionContainer>

      <CRecommendButton
        btnText="추첨 시작"
        selectType="restaurant"
        disabled={recommendBtnDisabled}
        style={{ margin: '48px auto 0' }}
      />

      <RefreshButton btnText="선택 초기화" disabled={refreshBtnDisabled} onClick={resetSelectRestaurant} />
    </>
  );
}
