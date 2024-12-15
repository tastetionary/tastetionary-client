import { getRestaurantOption } from '@/apis/restaurant/option';
import { requireAuth } from '@/utils/auth';
import { Hydrate, QueryClient, dehydrate } from '@tanstack/react-query';
import SelectRestaurant from './components/SelectRestaurant';

export default async function SelectRestaurantPage() {
  requireAuth();

  const queryClient = new QueryClient();

  // Pre-fetching data server-side
  await queryClient.prefetchQuery(['restaurant-option'], () => getRestaurantOption());

  // Dehydrating the state for client-side hydration
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <SelectRestaurant />
    </Hydrate>
  );
}
