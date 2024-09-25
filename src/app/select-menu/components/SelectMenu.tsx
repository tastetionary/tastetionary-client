'use client';

import { getFoodOption } from '@/apis/food/option';
import BottomButtonContainer from '@/components/Button/BottomButtonContainer';
import RefreshButton from '@/components/Button/RefreshButton';
import CRecommendButton from '@/components/c-recommend-button';
import CSelectCategory from '@/components/c-select-category';
import CSelectKeyword from '@/components/c-select-keyword';
import Header from '@/components/Header';
import { useSelectFoodStore } from '@/store/useSelectFoodStore';
import { useQuery } from '@tanstack/react-query';

export default function SelectMenu() {
  const { category, keyword, resetSelectFood } = useSelectFoodStore();

  const recommendBtnDisabled = category?.length === 0 || keyword?.length === 0;
  const refreshBtnDisabled = category?.length === 0 && keyword?.length === 0;

  const { data } = useQuery(['food-option'], () => getFoodOption(), {
    cacheTime: 0,
    staleTime: 0,
    enabled: false, // Do not refetch on the client
  });

  return (
    <>
      <Header title="메뉴 고르기" />

      <div className="px-xl pb-[120px]">
        <div className="mt-xxl">
          <div className="title2">
            <strong className="title2 font-bold">음식 종류</strong>를 선택하세요.
          </div>

          <p className="body2 mt-xs">여러 개 선택 가능합니다.</p>

          <div className="mt-lg">
            <CSelectCategory data={data?.categories} selectType="food" />
          </div>
        </div>

        <div className="mt-xxl">
          <div className="title2">
            <strong className="title2 font-bold">키워드</strong>를 선택하세요.
          </div>

          <p className="body2 mt-xs">여러 개 선택 가능합니다.</p>

          <div className="mt-lg">
            <CSelectKeyword data={data?.keywords} selectType="food" />
          </div>
        </div>

        <BottomButtonContainer>
          <RefreshButton btnText="초기화" onClick={resetSelectFood} disabled={refreshBtnDisabled} />

          <CRecommendButton btnText="메뉴 추첨 시작" selectType="food" disabled={recommendBtnDisabled} />
        </BottomButtonContainer>
      </div>
    </>
  );
}
