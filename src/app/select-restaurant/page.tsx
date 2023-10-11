'use client';

import { getRestaurantOption } from '@/apis/restaurant/option';
import IC_MAP from '@/assets/common/map.svg';
import RefreshButton from '@/components/Button/RefreshButton';
import CHeader from '@/components/c-header';
import CSelectButton from '@/components/c-select-button';
import CSelectCategory from '@/components/c-select-category';
import CSelectKeyword from '@/components/c-select-keyword';
import CSelectSection from '@/components/c-select-section';
import CSlider from '@/components/c-slider';
import { selectRestaurantState } from '@/lib/atom';
import { useQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import * as S from './page.styled';

export default function SelectRestaurant() {
  const restaurantState = useRecoilValue(selectRestaurantState);

  const btnDisabled = restaurantState?.category?.length === 0 || restaurantState?.keyword?.length === 0;

  const { data } = useQuery(['restaurant-option'], () => getRestaurantOption(), {
    cacheTime: 0,
    staleTime: 0,
  });

  return (
    <>
      <CHeader title="식당 고르기" isBackBtn />

      <S.ChangeRegionContainer>
        <S.FlexBox>
          <IC_MAP width={24} height={24} />

          <S.Region>논현동</S.Region>
        </S.FlexBox>

        <S.ChangeText>식사 지역 변경 &gt;</S.ChangeText>
      </S.ChangeRegionContainer>

      <S.SectionContainer>
        <CSelectSection title="음식 종류">
          <CSelectCategory data={data?.categories} selectType="restaurant" isDuplicate={false} />
        </CSelectSection>

        <CSelectSection title="키워드" subtitle="(복수 선택 가능)">
          <CSelectKeyword data={data?.keywords} selectType="restaurant" />
        </CSelectSection>

        <CSelectSection title="가격">
          <CSlider markData={data?.prices ?? []} />
        </CSelectSection>
      </S.SectionContainer>

      <CSelectButton
        btnText="추첨 시작"
        selectType="restaurant"
        disabled={btnDisabled}
        style={{ maxWidth: 240, margin: '48px auto 0' }}
      />

      <RefreshButton btnText="선택 초기화" disabled={btnDisabled} onClick={() => {}} />
    </>
  );
}
