import { getFoodOption } from '@/apis/food/option';
import getQueryClient from '@/lib/react-query/getQueryClient';
import { dehydrate, Hydrate } from '@tanstack/react-query';
import SelectMenu from './components/SelectMenu';

export default async function SelectMenuPage() {
  const queryClient = getQueryClient();

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
