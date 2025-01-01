'use client';

import { getFoodOption } from '@/apis/food/option';
import BottomButtonContainer from '@/components/Button/BottomButtonContainer';
import RefreshButton from '@/components/Button/RefreshButton';
import CHeader from '@/components/c-header';
import CRecommendButton from '@/components/c-recommend-button';
import CSelectCategory from '@/components/c-select-category';
import CSelectKeyword from '@/components/c-select-keyword';
import ContentLayout from '@/components/layout/content-layout';
import { useSelectFoodStore } from '@/store/useSelectFoodStore';
import { useQuery } from '@tanstack/react-query';
import SelectSection from './SelectSection';

export default function SelectMenu() {
  const { category, keyword, resetSelectFood } = useSelectFoodStore();

  const recommendBtnDisabled = category?.length === 0 || keyword?.length === 0;
  const refreshBtnDisabled = category?.length === 0 && keyword?.length === 0;

  const { data } = useQuery({
    queryKey: ['food-option'],
    queryFn: () => getFoodOption(),
    enabled: false,
  });

  return (
    <>
      <CHeader title="메뉴 고르기" />

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
