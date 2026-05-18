import { getFoodOption } from '@/apis/food/option';
import { QueryClient, dehydrate } from '@tanstack/query-core';
import { HydrationBoundary } from '@tanstack/react-query';
import SelectMenuV2 from './components/SelectMenuV2';

export default async function V2SelectMenuPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['food-option'],
    queryFn: () => getFoodOption(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SelectMenuV2 />
    </HydrationBoundary>
  );
}
