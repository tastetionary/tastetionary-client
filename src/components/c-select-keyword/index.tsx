import { useReviewStore } from '@/store/useReviewStore';
import { useSelectFoodStore } from '@/store/useSelectFoodStore';
import { useSelectRestaurantStore } from '@/store/useSelectRestaurantStore';
import { useEffect, useState } from 'react';
import DefaultButton from '../Button/DefaultButton';

interface Props {
  selectType: 'food' | 'restaurant' | 'review';
  data?: { id: number; name: string }[];
}

export default function CSelectKeyword({ data, selectType }: Props) {
  const [selectedKeyword, setSelectedKeyword] = useState<string[]>([]);

  const { keyword: foodKeyword, setFoodKeyword } = useSelectFoodStore();
  const { keyword: restaurantKeyword, setRestaurantKeyword } = useSelectRestaurantStore();
  const { keyword: reviewKeyword, setReviewKeyword } = useReviewStore();

  useEffect(() => {
    if (selectType === 'food') {
      setFoodKeyword(selectedKeyword);
    } else if (selectType === 'restaurant') {
      setRestaurantKeyword(selectedKeyword);
    } else {
      setReviewKeyword(selectedKeyword);
    }
  }, [selectedKeyword, selectType]);

  useEffect(() => {
    setSelectedKeyword(
      selectType === 'food' ? foodKeyword : selectType === 'restaurant' ? restaurantKeyword : reviewKeyword
    );
  }, [foodKeyword, restaurantKeyword, reviewKeyword, selectType]);

  return (
    <div className="flex flex-wrap gap-[14px]">
      {data?.map((k, i) => {
        const isSelected = selectedKeyword?.includes(k?.name);

        return (
          <DefaultButton
            bgColor="gray"
            customStyle={`px-16 py-12 ${isSelected ? 'selected' : ''}`}
            className="test"
            key={k.id}
            type="button"
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
                  const allKeywordName = data?.map(k => k.name);

                  setSelectedKeyword(allKeywordName);
                } else {
                  setSelectedKeyword(prev => [...prev, k?.name]);
                }
              }
            }}
          >
            <span className="body1">{k.name}</span>
          </DefaultButton>
        );
      })}
    </div>
  );
}
