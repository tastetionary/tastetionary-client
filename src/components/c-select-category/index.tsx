import { reviewState, selectFoodState, selectRestaurantState } from '@/lib/atom';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import * as S from './page.styled';

interface Props {
  selectType: 'food' | 'restaurant' | 'review';
  data?: { id: number; name: string; icon: string }[];
  isDuplicate?: boolean;
}

export default function CSelectCategory({ selectType, data, isDuplicate = true }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);

  const setFoodState = useSetRecoilState(selectFoodState);
  const setRestaurantState = useSetRecoilState(selectRestaurantState);
  const setReviewState = useSetRecoilState(reviewState);

  useEffect(() => {
    if (selectType === 'food') {
      setFoodState(prev => ({
        ...prev,
        category: selectedCategory,
      }));
    } else if (selectType === 'restaurant') {
      setRestaurantState(prev => ({
        ...prev,
        category: selectedCategory,
      }));
    } else {
      setReviewState(prev => ({
        ...prev,
        category: selectedCategory,
      }));
    }
  }, [selectedCategory, selectType]);

  return (
    <S.MenuContainer>
      {data?.map((m: { id: number; name: string; icon: string }, i: number) => {
        const isSelected = selectedCategory?.includes(m?.name);

        const onMenuItemClick = () => {
          if (!isDuplicate) return setSelectedCategory([m?.name]);

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
        };

        return (
          <S.MenuItem key={m.id} onClick={onMenuItemClick}>
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
