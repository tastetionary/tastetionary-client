import { getFoodOption } from '@/apis/food/option';
import { dehydrate, Hydrate, QueryClient } from '@tanstack/react-query';
import SelectMenu from './components/SelectMenu';

export default async function SelectMenuPage() {
  const queryClient = new QueryClient();

  // Pre-fetching data server-side
  await queryClient.prefetchQuery(['food-option'], () => getFoodOption());

  // Dehydrating the state for client-side hydration
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <SelectMenu />
    </Hydrate>
  );
}
