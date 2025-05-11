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
  const { category: foodCategory, setFoodCategory } = useSelectFoodStore();
  const { category: restaurantCategory, setRestaurantCategory } = useSelectRestaurantStore();
  const { category: reviewCategory, setReviewCategory } = useReviewStore();

  // 현재 타입에 맞는 스토어의 카테고리 값을 가져옵니다
  const getCurrentStoreCategory = () => {
    if (selectType === 'food') return foodCategory;
    if (selectType === 'restaurant') return restaurantCategory;
    return reviewCategory;
  };

  // 로컬 상태는 현재 타입의 스토어 카테고리로 초기화
  const [selectedCategory, setSelectedCategory] = useState<string[]>(() => getCurrentStoreCategory());

  // 로컬 상태가 변경될 때만 스토어 업데이트 (초기화 X)
  const updateStore = (categories: string[]) => {
    if (selectType === 'food') {
      setFoodCategory(categories);
    } else if (selectType === 'restaurant') {
      setRestaurantCategory(categories);
    } else {
      setReviewCategory(categories);
    }
  };

  // 컴포넌트 마운트 시 또는 selectType이 변경될 때만 로컬 상태 초기화
  useEffect(() => {
    console.log('selectType', selectType);
    setSelectedCategory(getCurrentStoreCategory());
  }, [selectType]); // selectType이 변경될 때만 로컬 상태 초기화

  return (
    <div className="grid grid-cols-4 items-center gap-[16px]">
      {data?.map((m: { id: number; name: string; icon: string }, i: number) => {
        const isSelected = selectedCategory?.includes(m?.name);
        const isAll = m.id === 0; // 전체

        const allCatgoryName = data?.map(m => m.name);

        const onMenuItemClick = () => {
          let newCategories: string[];

          if (selectedCategory?.length > 0 && isSelected) {
            // 이미 선택된 경우
            if (isAll) {
              newCategories = [];
            } else {
              newCategories = selectedCategory.filter(p => p !== m?.name);
            }
          } else {
            // 새롭게 추가하는 경우
            if (isAll) {
              newCategories = allCatgoryName;
            } else if (isDuplicate) {
              newCategories = [...selectedCategory, m?.name];
            } else {
              newCategories = [m?.name];
            }
          }

          // 로컬 상태와 스토어 상태 모두 한번에 업데이트
          setSelectedCategory(newCategories);
          updateStore(newCategories);
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
