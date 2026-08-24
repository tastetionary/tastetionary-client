import Image from 'next/image';
import { useSelectFoodStore } from '@/features/recommendation/store/useSelectFoodStore';
import { useSelectRestaurantStore } from '@/features/recommendation/store/useSelectRestaurantStore';
import { useReviewStore } from '@/features/reviews/store/useReviewStore';
import { colors } from '@/styles/colors';

interface Props {
  selectType: 'food' | 'restaurant' | 'review';
  data?: { id: number; name: string; icon: string }[];
  isDuplicate?: boolean;
}

export default function CSelectCategory({ selectType, data, isDuplicate = true }: Props) {
  const { category: foodCategory, setFoodCategory } = useSelectFoodStore();
  const { category: restaurantCategory, setRestaurantCategory } = useSelectRestaurantStore();
  const { category: reviewCategory, setReviewCategory } = useReviewStore();

  const selectedCategory =
    selectType === 'food' ? foodCategory : selectType === 'restaurant' ? restaurantCategory : reviewCategory;

  const updateStore = (categories: string[]) => {
    if (selectType === 'food') {
      setFoodCategory(categories);
    } else if (selectType === 'restaurant') {
      setRestaurantCategory(categories);
    } else {
      setReviewCategory(categories);
    }
  };

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
            <span className={'body1 text-nowrap'} style={{ color: isSelected ? colors.secondary.o50 : undefined }}>
              {m?.name}
            </span>
          </div>
        );
      })}
    </div>
  );
}
