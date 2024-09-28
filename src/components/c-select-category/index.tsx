import { useReviewStore } from '@/store/useReviewStore';
import { useSelectFoodStore } from '@/store/useSelectFoodStore';
import { useSelectRestaurantStore } from '@/store/useSelectRestaurantStore';
import { theme } from '@/styles/theme';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface Props {
  selectType: 'food' | 'restaurant' | 'review';
  data?: { id: number; name: string; icon: string }[];
  isDuplicate?: boolean;
}

export default function CSelectCategory({ selectType, data, isDuplicate = true }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);

  const { category: foodCategory, setFoodCategory } = useSelectFoodStore();
  const { category: restaurantCategory, setRestaurantCategory } = useSelectRestaurantStore();
  const { category: reviewCategory, setReviewCategory } = useReviewStore();

  useEffect(() => {
    if (selectType === 'food') {
      setFoodCategory(selectedCategory);
    } else if (selectType === 'restaurant') {
      setRestaurantCategory(selectedCategory);
    } else {
      setReviewCategory(selectedCategory);
    }
  }, [selectedCategory, selectType]);

  useEffect(() => {
    setSelectedCategory(
      selectType === 'food' ? foodCategory : selectType === 'restaurant' ? restaurantCategory : reviewCategory
    );
  }, [foodCategory, restaurantCategory, reviewCategory, selectType]);

  return (
    <div className="grid grid-cols-4 items-center gap-[16px]">
      {data?.map((m: { id: number; name: string; icon: string }, i: number) => {
        const isSelected = selectedCategory?.includes(m?.name);
        const isAll = m.id === 0; // 전체

        const allCatgoryName = data?.map(m => m.name);

        const onMenuItemClick = () => {
          if (selectedCategory?.length > 0 && isSelected) {
            // 이미 선택된 경우
            if (isAll) {
              setSelectedCategory([]);
            } else {
              setSelectedCategory(prev => {
                const filtered: string[] = prev.filter(p => p !== m?.name);

                return [...filtered];
              });
            }
          } else {
            // 새롭게 추가하는 경우
            if (isAll) {
              setSelectedCategory(allCatgoryName);
            } else if (isDuplicate) {
              setSelectedCategory(prev => [...prev, m?.name]);
            } else {
              setSelectedCategory([m?.name]);
            }
          }
        };

        return (
          <div className="flex cursor-pointer flex-col items-center gap-[4px]" key={m.id} onClick={onMenuItemClick}>
            <Image
              src={`/image/Menu/${m?.icon}${isSelected ? '_selected' : ''}.svg`}
              alt={m?.icon}
              width={64}
              height={64}
            />
            <span
              className={'body1 text-nowrap'}
              style={{ color: isSelected ? theme.colors.secondary.o50 : undefined }}
            >
              {m?.name}
            </span>
          </div>
        );
      })}
    </div>
  );
}
