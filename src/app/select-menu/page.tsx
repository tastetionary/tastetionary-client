'use client';

import IC_PIN2 from '@/assets/common/Pin2.svg';
import menu_set from '@/assets/data/menu_set.json';
import MainButton from '@/components/Button/MainButton';
import RefreshButton from '@/components/Button/RefreshButton';
import CHeader from '@/components/c-header';
import Image from 'next/image';
import { useState } from 'react';
import * as S from './page.styled';

export default function SelectMenu() {
  const menuData = menu_set?.category;
  const keywordData = menu_set?.keyword;

  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [selectedKeyword, setSelectedKeyword] = useState<string[]>([]);

  const btnDisabled = selectedCategory.length === 0 || selectedKeyword.length === 0;

  console.log(selectedCategory);
  console.log(selectedKeyword);

  return (
    <>
      <CHeader title="메뉴 고르기" isBackBtn />

      <S.Section>
        <S.SectionTitleContainer>
          <IC_PIN2 />
          <S.SectionTitle>음식 종류</S.SectionTitle>
          <S.SectionDesc>(복수 선택 가능)</S.SectionDesc>
        </S.SectionTitleContainer>

        <S.MenuContainer>
          {menuData?.map((m, i) => {
            const isSelected = selectedCategory?.includes(m?.name);

            return (
              <S.MenuItem
                key={m.id}
                onClick={() => {
                  if (selectedCategory?.length > 0 && isSelected) {
                    // 이미 선택된 경우
                    if (i === 0) {
                      setSelectedCategory([]);
                    } else {
                      setSelectedCategory(prev => {
                        const filtered: string[] = prev.filter(p => p !== m?.name);

                        return [...filtered];
                      });
                    }
                  } else {
                    // 새롭게 추가하는 경우
                    if (i === 0) {
                      const allCatgoryName = menuData?.map(m => m.name);

                      setSelectedCategory(allCatgoryName);
                    } else {
                      setSelectedCategory(prev => [...prev, m?.name]);
                    }
                  }
                }}
              >
                <Image
                  src={`./image/Menu/${m?.icon}${isSelected ? '_selected' : ''}.svg`}
                  alt={m?.icon}
                  width={64}
                  height={64}
                />
                <S.MenuItemTitle>{m?.name}</S.MenuItemTitle>
              </S.MenuItem>
            );
          })}
        </S.MenuContainer>
      </S.Section>

      <S.Section>
        <S.SectionTitleContainer>
          <IC_PIN2 />
          <S.SectionTitle>키워드</S.SectionTitle>
          <S.SectionDesc>(복수 선택 가능)</S.SectionDesc>
        </S.SectionTitleContainer>

        <S.KeywordContainer>
          {keywordData?.map((k, i) => {
            const isSelected = selectedKeyword?.includes(k?.name);

            return (
              <S.KeywordBtn
                key={k.id}
                $isSelected={isSelected}
                onClick={() => {
                  if (selectedKeyword?.length > 0 && isSelected) {
                    // 이미 선택된 경우
                    if (i === 0) {
                      setSelectedKeyword([]);
                    } else {
                      setSelectedKeyword(prev => {
                        const filtered: string[] = prev.filter(p => p !== k?.name);

                        return [...filtered];
                      });
                    }
                  } else {
                    // 새롭게 추가하는 경우
                    if (i === 0) {
                      const allKeywordName = keywordData?.map(k => k.name);

                      setSelectedKeyword(allKeywordName);
                    } else {
                      setSelectedKeyword(prev => [...prev, k?.name]);
                    }
                  }
                }}
              >
                {k.name}
              </S.KeywordBtn>
            );
          })}
        </S.KeywordContainer>
      </S.Section>

      <MainButton btnText="메뉴 추첨 시작" disabled={btnDisabled} style={{ maxWidth: 240, margin: '48px auto 0' }} />

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
