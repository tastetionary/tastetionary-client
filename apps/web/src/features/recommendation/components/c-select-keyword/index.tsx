import { useSelectFoodStore } from '@/features/recommendation/store/useSelectFoodStore';
import { useSelectRestaurantStore } from '@/features/recommendation/store/useSelectRestaurantStore';
import { useReviewStore } from '@/features/reviews/store/useReviewStore';
import DefaultButton from '@/shared/ui/Button/DefaultButton';

interface Props {
  selectType: 'food' | 'restaurant' | 'review';
  data?: { id: number; name: string }[];
}

export default function CSelectKeyword({ data, selectType }: Props) {
  const { keyword: foodKeyword, setFoodKeyword } = useSelectFoodStore();
  const { keyword: restaurantKeyword, setRestaurantKeyword } = useSelectRestaurantStore();
  const { keyword: reviewKeyword, setReviewKeyword } = useReviewStore();

  const selectedKeyword =
    selectType === 'food' ? foodKeyword : selectType === 'restaurant' ? restaurantKeyword : reviewKeyword;

  const updateStore = (keywords: string[]) => {
    if (selectType === 'food') {
      setFoodKeyword(keywords);
    } else if (selectType === 'restaurant') {
      setRestaurantKeyword(keywords);
    } else {
      setReviewKeyword(keywords);
    }
  };

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
                  const allKeywordNames = data?.map(keyword => keyword.name) || [];
                  newKeywords = allKeywordNames;
                } else {
                  newKeywords = [...selectedKeyword, k?.name];
                }
              }

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
