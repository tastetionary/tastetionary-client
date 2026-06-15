'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import SelectSection from './SelectSection';
import { getFoodOption } from '@/apis/food/option';
import BottomButtonContainer from '@/components/Button/BottomButtonContainer';
import RefreshButton from '@/components/Button/RefreshButton';
import CHeader from '@/components/c-header';
import CRecommendButton from '@/components/c-recommend-button';
import CSelectCategory from '@/components/c-select-category';
import CSelectKeyword from '@/components/c-select-keyword';
import ContentLayout from '@/components/layout/content-layout';
import { useSelectFoodStore } from '@/store/useSelectFoodStore';

export default function SelectMenu() {
  const { category, keyword, resetSelectFood } = useSelectFoodStore();

  // 페이지 진입 시 이전에 선택했던 값을 초기화한다.
  useEffect(() => {
    resetSelectFood();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const recommendBtnDisabled = category?.length === 0 || keyword?.length === 0;
  const refreshBtnDisabled = category?.length === 0 && keyword?.length === 0;

  const { data } = useQuery({
    queryKey: ['food-option'],
    queryFn: () => getFoodOption(),
    enabled: false,
  });

  return (
    <>
      <CHeader title="메뉴 고르기" onBackPress={resetSelectFood} />

      <ContentLayout>
        <SelectSection title={{ bold: '음식 종류', normal: '를 선택하세요.' }} subtitle="여러 개 선택 가능합니다.">
          <CSelectCategory data={data?.categories} selectType="food" />
        </SelectSection>

        <SelectSection title={{ bold: '키워드', normal: '를 선택하세요.' }} subtitle="여러 개 선택 가능합니다.">
          <CSelectKeyword data={data?.keywords} selectType="food" />
        </SelectSection>
      </ContentLayout>

      <BottomButtonContainer>
        <RefreshButton btnText="초기화" onClick={resetSelectFood} disabled={refreshBtnDisabled} />

        <CRecommendButton btnText="메뉴 추첨 시작" selectType="food" disabled={recommendBtnDisabled} />
      </BottomButtonContainer>
    </>
  );
}
