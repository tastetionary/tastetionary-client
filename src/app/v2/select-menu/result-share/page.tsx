import { unicodeToText } from '@/components/c-recommend-button/utils';
import { FoodCategory, FoodKeyword } from '@/types/enums';
import SelectMenuResultShareV2 from './components/SelectMenuResultShareV2';

export default async function V2SelectMenuResultSharePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const { category: encodedCategory, keyword: encodedKeyword, id: encodedId, name: encodedName } = await searchParams;

  const decoded = (encoded: string | undefined): string[] => {
    if (!encoded) return [];
    const decoded = decodeURIComponent(encoded);

    return decoded.split(',').map(unicodeToText);
  };

  const validFoodCategories = Object.values(FoodCategory);
  const validFoodKeywords = Object.values(FoodKeyword);

  const decodedCategory = decoded(encodedCategory) as FoodCategory[];
  const decodedKeyword = decoded(encodedKeyword) as FoodKeyword[];
  const decodedIdArr = decoded(encodedId);
  const decodedId = decodedIdArr.length > 0 ? Number(decodedIdArr[0]) || 0 : 0;
  const decodedName = decoded(encodedName)[0] ?? '';

  const category = decodedCategory.every(c => validFoodCategories.includes(c)) ? decodedCategory : [];
  const keyword = decodedKeyword.every(c => validFoodKeywords.includes(c)) ? decodedKeyword : [];

  return <SelectMenuResultShareV2 category={category} keyword={keyword} id={decodedId} name={decodedName} />;
}
