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
  const { keyword: foodKeyword, setFoodKeyword } = useSelectFoodStore();
  const { keyword: restaurantKeyword, setRestaurantKeyword } = useSelectRestaurantStore();
  const { keyword: reviewKeyword, setReviewKeyword } = useReviewStore();

  // 현재 타입에 맞는 스토어의 키워드 값을 가져오는 함수
  const getCurrentStoreKeyword = () => {
    if (selectType === 'food') return foodKeyword;
    if (selectType === 'restaurant') return restaurantKeyword;
    return reviewKeyword;
  };

  // 로컬 상태는 현재 타입의 스토어 키워드로 초기화
  const [selectedKeyword, setSelectedKeyword] = useState<string[]>(() => getCurrentStoreKeyword());

  // 스토어 업데이트 함수
  const updateStore = (keywords: string[]) => {
    if (selectType === 'food') {
      setFoodKeyword(keywords);
    } else if (selectType === 'restaurant') {
      setRestaurantKeyword(keywords);
    } else {
      setReviewKeyword(keywords);
    }
  };

  // selectType이 변경될 때만 로컬 상태 초기화
  useEffect(() => {
    setSelectedKeyword(getCurrentStoreKeyword());
  }, [selectType]);

  return (
    <div className="flex flex-wrap gap-[14px]">
      {data?.map((k, i) => {
        const isSelected = selectedKeyword?.includes(k?.name);
        const isAll = i === 0; // 첫 번째 항목이 '전체' 옵션이라고 가정

        return (
          <DefaultButton
            bgColor="gray"
            customStyle={`px-16 py-12 ${isSelected ? 'selected' : ''}`}
            className="test"
            key={k.id}
            type="button"
            onClick={() => {
              let newKeywords: string[];

              if (selectedKeyword?.length > 0 && isSelected) {
                // 이미 선택된 경우
                if (isAll) {
                  newKeywords = [];
                } else {
                  newKeywords = selectedKeyword.filter(p => p !== k?.name);
                }
              } else {
                // 새롭게 추가하는 경우
                if (isAll) {
                  const allKeywordNames = data?.map(k => k.name) || [];
                  newKeywords = allKeywordNames;
                } else {
                  newKeywords = [...selectedKeyword, k?.name];
                }
              }

              // 로컬 상태와 스토어 상태 모두 한번에 업데이트
              setSelectedKeyword(newKeywords);
              updateStore(newKeywords);
            }}
          >
            <span className="body1">{k.name}</span>
          </DefaultButton>
        );
      })}
    </div>
  );
}
