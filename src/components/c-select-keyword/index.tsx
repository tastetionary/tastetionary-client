import { useReviewStore } from '@/store/useReviewStore';
import { useSelectFoodStore } from '@/store/useSelectFoodStore';
import { useSelectRestaurantStore } from '@/store/useSelectRestaurantStore';
import { useEffect, useState } from 'react';
import * as S from './page.styled';

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
    <S.KeywordContainer>
      {data?.map((k, i) => {
        const isSelected = selectedKeyword?.includes(k?.name);

        return (
          <S.KeywordBtn
            key={k.id}
            type="button"
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
                  const allKeywordName = data?.map(k => k.name);

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
  );
}
