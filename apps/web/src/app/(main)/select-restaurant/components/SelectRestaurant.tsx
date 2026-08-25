'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import SelectPrice from './SelectPrice';
import SelectSection from '@/app/(main)/select-menu/components/SelectSection';
import { getRestaurantOption } from '@/features/recommendation/api/restaurant/option';
import CRecommendButton from '@/features/recommendation/components/c-recommend-button';
import CSelectCategory from '@/features/recommendation/components/c-select-category';
import CSelectKeyword from '@/features/recommendation/components/c-select-keyword';
import { useSelectRestaurantStore } from '@/features/recommendation/store/useSelectRestaurantStore';
import CChangeRegion from '@/features/region/components/c-change-region';
import BottomButtonContainer from '@/shared/ui/Button/BottomButtonContainer';
import RefreshButton from '@/shared/ui/Button/RefreshButton';
import CHeader from '@/shared/ui/c-header';
import ContentLayout from '@/shared/ui/layout/content-layout';

export default function SelectRestaurant() {
  const { category, keyword, resetSelectRestaurant } = useSelectRestaurantStore();

  // 페이지 진입 시 이전에 선택했던 값을 초기화한다.
  useEffect(() => {
    resetSelectRestaurant();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const recommendBtnDisabled = category?.length === 0 || keyword?.length === 0;
  const refreshBtnDisabled = category?.length === 0 && keyword?.length === 0;

  const { data } = useQuery({
    queryKey: ['restaurant-option'],
    queryFn: () => getRestaurantOption(),
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
          <SelectPrice type="restaurant" />
        </SelectSection>
      </ContentLayout>

      <BottomButtonContainer>
        <RefreshButton btnText="초기화" onClick={resetSelectRestaurant} disabled={refreshBtnDisabled} />

        <CRecommendButton btnText="식당 추첨 시작" selectType="restaurant" disabled={recommendBtnDisabled} />
      </BottomButtonContainer>
    </>
  );
}
