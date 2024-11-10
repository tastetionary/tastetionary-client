import { postFoodRecommend } from '@/apis/food/recommend';
import { unicodeToText } from '@/components/c-recommend-button/utils';
import getQueryClient from '@/lib/react-query/getQueryClient';
import { dehydrate, Hydrate } from '@tanstack/react-query';
import SelectMenuResultShare from './components/SelectMenuResultShare';

export default async function SelectMenuResultSharePage({
  searchParams,
}: {
  searchParams: Record<string, string | undefined>;
}) {
  const queryClient = getQueryClient();

  const { category: encodedCategory, keyword: encodedKeyword } = searchParams;

  const category = JSON.parse(decodeURIComponent(encodedCategory!)).map((d: string) => unicodeToText(d));
  const keyword = JSON.parse(decodeURIComponent(encodedKeyword!)).map((d: string) => unicodeToText(d));

  // Pre-fetching data server-side
  await queryClient.prefetchQuery(['food-recommend', encodedCategory, encodedKeyword], () =>
    postFoodRecommend({ categories: category, keywords: keyword })
  );

  // Dehydrating the state for client-side hydration
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <SelectMenuResultShare />
    </Hydrate>
  );
}
