import SelectMenuResultShare from './components/SelectMenuResultShare';
import { enumKeysToValues } from '@/features/recommendation/components/c-recommend-button/utils';
import { FoodCategory, FoodKeyword } from '@/shared/types/enums';

export default async function SelectMenuResultSharePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const { category: categoryParam, keyword: keywordParam, id: idParam, name: nameParam } = await searchParams;

  // 공유 URL에는 enum 키(예: 'KOREAN')가 콤마로 구분되어 실린다. 원래 한글 값으로 복원.
  const category = enumKeysToValues(FoodCategory, categoryParam ? categoryParam.split(',') : []);
  const keyword = enumKeysToValues(FoodKeyword, keywordParam ? keywordParam.split(',') : []);
  const id = Number(idParam ?? 0);
  const name = nameParam ?? '';

  return <SelectMenuResultShare category={category} keyword={keyword} id={id} name={name} />;
}
