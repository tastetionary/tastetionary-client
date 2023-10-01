import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';
import * as S from './page.styled';

interface Props {
  data: { id: number; name: string; icon: string }[];
  selectedCategory: string[];
  setSelectedCategory: Dispatch<SetStateAction<string[]>>;
}

export default function CSelectCategory({ data, selectedCategory, setSelectedCategory }: Props) {
  return (
    <S.MenuContainer>
      {data?.map((m: { id: number; name: string; icon: string }, i: number) => {
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
                  const allCatgoryName = data?.map(m => m.name);

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
  );
}
