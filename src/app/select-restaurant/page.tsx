import { getRestaurantOption } from '@/apis/restaurant/option';
import getQueryClient from '@/lib/react-query/getQueryClient';
import { requireAuth } from '@/utils/auth';
import { Hydrate, dehydrate } from '@tanstack/react-query';
import SelectRestaurant from './components/SelectRestaurant';

export default async function SelectRestaurantPage() {
  requireAuth();

  const queryClient = getQueryClient();

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
