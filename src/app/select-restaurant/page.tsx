'use client';

import restaurant_set from '@/assets/data/restaurant_set.json';
import MainButton from '@/components/Button/MainButton';
import RefreshButton from '@/components/Button/RefreshButton';
import { MODAL_TYPES } from '@/components/Modal/GlobalModal';
import useModal from '@/components/Modal/GlobalModal/hooks/useModal';
import CChangeRegion from '@/components/c-change-region';
import CHeader from '@/components/c-header';
import CSelectCategory from '@/components/c-select-category';
import CSelectKeyword from '@/components/c-select-keyword';
import CSelectSection from '@/components/c-select-section';
import CSlider from '@/components/c-slider';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import * as S from './page.styled';

export default function SelectRestaurant() {
  const categoryData = restaurant_set?.category;
  const keywordData = restaurant_set?.keyword;

  const { openModal } = useModal();
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [selectedKeyword, setSelectedKeyword] = useState<string[]>([]);
  const [price, setPrice] = useState<number>(0);

  const btnDisabled = selectedCategory.length === 0 || selectedKeyword.length === 0;

  const loadingModal = () => {
    openModal(MODAL_TYPES.loading, {
      handleClose: () => router.push('/select-restaurant/result'),
    });
  };

  return (
    <>
      <CHeader title="식당 고르기" isBackBtn />

      <CChangeRegion region="논현동" type="dining_area" />

      <S.SectionContainer>
        <CSelectSection title="음식 종류" subtitle="(복수 선택 가능)">
          <CSelectCategory
            data={categoryData}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </CSelectSection>

        <CSelectSection title="키워드" subtitle="(복수 선택 가능)">
          <CSelectKeyword
            data={keywordData}
            selectedKeyword={selectedKeyword}
            setSelectedKeyword={setSelectedKeyword}
          />
        </CSelectSection>

        <CSelectSection title="가격">
          <CSlider value={price} changeEvent={value => setPrice(value)} />
        </CSelectSection>
      </S.SectionContainer>

      <MainButton
        btnText="추첨 시작"
        disabled={btnDisabled}
        style={{ maxWidth: 240, margin: '48px auto 0' }}
        onClick={loadingModal}
      />

      <RefreshButton
        btnText="선택 초기화"
        disabled={btnDisabled}
        onClick={() => {
          setSelectedCategory([]);
          setSelectedKeyword([]);
          setPrice(0);
        }}
      />
    </>
  );
}
