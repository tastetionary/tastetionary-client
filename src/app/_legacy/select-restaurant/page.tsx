import { getRestaurantOption } from '@/apis/restaurant/option';
import { withAuth } from '@/utils/auth';
import { QueryClient, dehydrate } from '@tanstack/query-core';
import { HydrationBoundary } from '@tanstack/react-query';
import SelectRestaurant from './components/SelectRestaurant';

async function SelectRestaurantPage() {
  const queryClient = new QueryClient();

  // Pre-fetching data server-side
  await queryClient.prefetchQuery({
    queryKey: ['restaurant-option'],
    queryFn: () => getRestaurantOption(),
  });

  // Dehydrating the state for client-side hydration
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <SelectRestaurant />
    </HydrationBoundary>
  );
}

export default withAuth(SelectRestaurantPage, '/');
