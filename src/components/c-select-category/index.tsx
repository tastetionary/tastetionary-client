import { reviewState, selectFoodState, selectRestaurantState } from '@/lib/atom';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import * as S from './page.styled';

interface Props {
  selectType: 'food' | 'restaurant' | 'review';
  data?: { id: number; name: string; icon: string }[];
  isDuplicate?: boolean;
}

export default function CSelectCategory({ selectType, data, isDuplicate = true }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);

  const [foodState, setFoodState] = useRecoilState(selectFoodState);
  const [restaurantState, setRestaurantState] = useRecoilState(selectRestaurantState);
  const [review, setReviewState] = useRecoilState(reviewState);

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

  useEffect(() => {
    setSelectedCategory(
      selectType === 'food'
        ? foodState?.category
        : selectType === 'restaurant'
        ? restaurantState?.category
        : review?.category
    );
  }, [foodState?.category, restaurantState?.category, review?.category, selectType]);

  return (
    <S.MenuContainer>
      {data?.map((m: { id: number; name: string; icon: string }, i: number) => {
        const isSelected = selectedCategory?.includes(m?.name);

        const allCatgoryName = data?.map(m => m.name);

        const onMenuItemClick = () => {
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
              setSelectedCategory(allCatgoryName);
            } else if (isDuplicate) {
              setSelectedCategory(prev => [...prev, m?.name]);
            } else {
              setSelectedCategory([m?.name]);
            }
          }
        };

        return (
          <S.MenuItem key={m.id} onClick={onMenuItemClick}>
            <Image
              src={`/image/Menu/${m?.icon}${isSelected ? '_selected' : ''}.svg`}
              alt={m?.icon}
              width={64}
              height={64}
            />
            <S.MenuItemTitle isSelected={isSelected}>{m?.name}</S.MenuItemTitle>
          </S.MenuItem>
        );
      })}
    </S.MenuContainer>
  );
}
