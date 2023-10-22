import { reviewState, selectFoodState, selectRestaurantState } from '@/lib/atom';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import * as S from './page.styled';

interface Props {
  selectType: 'food' | 'restaurant' | 'review';
  data?: { id: number; name: string }[];
}

export default function CSelectKeyword({ data, selectType }: Props) {
  const [selectedKeyword, setSelectedKeyword] = useState<string[]>([]);

  const [foodState, setFoodState] = useRecoilState(selectFoodState);
  const [restaurantState, setRestaurantState] = useRecoilState(selectRestaurantState);
  const [review, setReviewState] = useRecoilState(reviewState);

  useEffect(() => {
    if (selectType === 'food') {
      setFoodState(prev => ({
        ...prev,
        keyword: selectedKeyword,
      }));
    } else if (selectType === 'restaurant') {
      setRestaurantState(prev => ({
        ...prev,
        keyword: selectedKeyword,
      }));
    } else {
      setReviewState(prev => ({
        ...prev,
        keyword: selectedKeyword,
      }));
    }
  }, [selectedKeyword, selectType]);

  useEffect(() => {
    setSelectedKeyword(
      selectType === 'food'
        ? foodState?.keyword
        : selectType === 'restaurant'
        ? restaurantState?.keyword
        : review?.keyword
    );
  }, [foodState?.keyword, restaurantState?.keyword, review?.keyword, selectType]);

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
