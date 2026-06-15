import SelectMenuResultShare from './components/SelectMenuResultShare';
import { unicodeToText } from '@/components/c-recommend-button/utils';
import { FoodCategory, FoodKeyword } from '@/types/enums';

export default async function SelectMenuResultSharePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const { category: encodedCategory, keyword: encodedKeyword, id: encodedId, name: encodedName } = await searchParams;

  const decoded = (encoded: string | undefined) => {
    if (!encoded) throw new Error('No encoded value provided');
    const decoded = decodeURIComponent(encoded);

    return decoded.split(',').map(unicodeToText);
  };

  const validFoodCategories = Object.values(FoodCategory);
  const validFoodKeywords = Object.values(FoodKeyword);

  const decodedCategory = decoded(encodedCategory) as FoodCategory[];
  const decodedKeyword = decoded(encodedKeyword) as FoodKeyword[];
  const decodedId = +decoded(encodedId)[0];
  const decodedName = decoded(encodedName)[0];

  let category = decodedCategory.every(c => validFoodCategories.includes(c)) ? decodedCategory : [];
  let keyword = decodedKeyword.every(c => validFoodKeywords.includes(c)) ? decodedKeyword : [];

  return <SelectMenuResultShare category={category} keyword={keyword} id={decodedId} name={decodedName} />;
}
