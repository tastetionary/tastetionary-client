'use client';

import { getFoodOption } from '@/apis/food/option';
import RefreshButton from '@/components/Button/RefreshButton';
import CHeader from '@/components/c-header';
import CRecommendButton from '@/components/c-recommend-button';
import CSelectCategory from '@/components/c-select-category';
import CSelectKeyword from '@/components/c-select-keyword';
import CSelectSection from '@/components/c-select-section';
import { selectFoodState } from '@/lib/atom';
import { useQuery } from '@tanstack/react-query';
import { useRecoilState } from 'recoil';
import * as S from './page.styled';

export default function SelectMenu() {
  const [foodState, setFoodState] = useRecoilState(selectFoodState);

  const btnDisabled = foodState?.category?.length === 0 || foodState?.keyword?.length === 0;

  const { data } = useQuery(['food-option'], () => getFoodOption(), {
    cacheTime: 0,
    staleTime: 0,
  });

  return (
    <>
      <CHeader title="메뉴 고르기" isBackBtn />

      <S.Container>
        <CSelectSection title="음식 종류 선택" subtitle="(복수 선택 가능)">
          <CSelectCategory data={data?.categories} selectType="food" />
        </CSelectSection>

        <CSelectSection title="키워드" subtitle="(복수 선택 가능)">
          <CSelectKeyword data={data?.keywords} selectType="food" />
        </CSelectSection>
      </S.Container>

      <CRecommendButton
        btnText="메뉴 추첨 시작"
        selectType="food"
        disabled={btnDisabled}
        style={{ margin: '48px auto 0' }}
      />

      <RefreshButton
        btnText="선택 초기화"
        disabled={btnDisabled}
        onClick={() =>
          setFoodState({
            category: [],
            keyword: [],
          })
        }
      />
    </>
  );
}
