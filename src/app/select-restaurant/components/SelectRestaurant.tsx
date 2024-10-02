'use client';

import { getRestaurantOption } from '@/apis/restaurant/option';
import SelectSection from '@/app/select-menu/components/SelectSection';
import BottomButtonContainer from '@/components/Button/BottomButtonContainer';
import RefreshButton from '@/components/Button/RefreshButton';
import CChangeRegion from '@/components/c-change-region';
import CHeader from '@/components/c-header';
import CRecommendButton from '@/components/c-recommend-button';
import CSelectCategory from '@/components/c-select-category';
import CSelectKeyword from '@/components/c-select-keyword';
import ContentLayout from '@/components/layout/content-layout';
import { useSelectRestaurantStore } from '@/store/useSelectRestaurantStore';
import { useQuery } from '@tanstack/react-query';
import SelectPrice from './SelectPrice';

export default function SelectRestaurant() {
  const { category, keyword, resetSelectRestaurant } = useSelectRestaurantStore();
  const recommendBtnDisabled = category?.length === 0 || keyword?.length === 0;
  const refreshBtnDisabled = category?.length === 0 && keyword?.length === 0;

  const { data } = useQuery(['restaurant-option'], () => getRestaurantOption(), {
    cacheTime: 0,
    staleTime: 0,
    enabled: false, // Do not refetch on the client
  });

  return (
    <>
      <CHeader title="식당 고르기" />

      <CChangeRegion type="dining_area" />

      <ContentLayout>
        <SelectSection title={{ bold: '음식 종류', normal: '를 선택하세요.' }}>
          <CSelectCategory data={data?.categories} selectType="restaurant" isDuplicate={false} />
        </SelectSection>

        <SelectSection title={{ bold: '키워드', normal: '를 선택하세요.' }} subtitle="여러 개 선택 가능합니다.">
          <CSelectKeyword data={data?.keywords} selectType="restaurant" />
        </SelectSection>

        <SelectSection title={{ bold: '가격대', normal: '를 선택하세요.' }}>
          <SelectPrice />
        </SelectSection>

        <BottomButtonContainer>
          <RefreshButton btnText="초기화" onClick={resetSelectRestaurant} disabled={refreshBtnDisabled} />

          <CRecommendButton btnText="식당 추첨 시작" selectType="restaurant" disabled={recommendBtnDisabled} />
        </BottomButtonContainer>
      </ContentLayout>
    </>
  );
}
