'use client';

import menu_set from '@/assets/data/menu_set.json';
import MainButton from '@/components/Button/MainButton';
import RefreshButton from '@/components/Button/RefreshButton';
import { MODAL_TYPES } from '@/components/Modal/GlobalModal';
import useModal from '@/components/Modal/GlobalModal/hooks/useModal';
import CHeader from '@/components/c-header';
import CSelectCategory from '@/components/c-select-category';
import CSelectKeyword from '@/components/c-select-keyword';
import CSelectSection from '@/components/c-select-section';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import * as S from './page.styled';

export default function SelectMenu() {
  const menuData = menu_set?.category;
  const keywordData = menu_set?.keyword;

  const { openModal } = useModal();
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [selectedKeyword, setSelectedKeyword] = useState<string[]>([]);

  const btnDisabled = selectedCategory.length === 0 || selectedKeyword.length === 0;

  console.log(selectedCategory);
  console.log(selectedKeyword);

  const loadingModal = () => {
    openModal(MODAL_TYPES.loading, {
      handleClose: () => router.push('/select-menu/result'),
    });
  };

  return (
    <>
      <CHeader title="메뉴 고르기" isBackBtn />

      <S.Container>
        <CSelectSection title="음식 종류 선택" subtitle="(복수 선택 가능)">
          <CSelectCategory
            data={menuData}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </CSelectSection>

        <CSelectSection title="키워드" subtitle="복수 선택 가능">
          <CSelectKeyword
            data={keywordData}
            selectedKeyword={selectedKeyword}
            setSelectedKeyword={setSelectedKeyword}
          />
        </CSelectSection>
      </S.Container>

      <MainButton
        btnText="메뉴 추첨 시작"
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
        }}
      />
    </>
  );
}
