'use client';

import IC_PIN2 from '@/assets/common/Pin2.svg';
import menu_set from '@/assets/data/menu_set.json';
import CHeader from '@/components/c-header';
import Image from 'next/image';
import { useState } from 'react';
import * as S from './page.styled';

export default function SelectMenu() {
  const menuData = menu_set?.category;
  const keywordData = menu_set?.keyword;

  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);

  console.log(selectedCategory);

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
    </>
  );
}
