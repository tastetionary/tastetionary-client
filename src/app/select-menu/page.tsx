import { getFoodOption } from '@/apis/food/option';
import { QueryClient, dehydrate } from '@tanstack/query-core';
import { HydrationBoundary } from '@tanstack/react-query';
import SelectMenu from './components/SelectMenu';

export default async function SelectMenuPage() {
  const queryClient = new QueryClient();

  // Pre-fetching data server-side
  await queryClient.prefetchQuery({
    queryKey: ['food-option'],
    queryFn: () => getFoodOption(),
  });

  // Dehydrating the state for client-side hydration
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <SelectMenu />
    </HydrationBoundary>
  );
}
