import { QueryClient, dehydrate } from '@tanstack/query-core';
import { HydrationBoundary } from '@tanstack/react-query';
import SelectRestaurant from './components/SelectRestaurant';
import { getRestaurantOption } from '@/apis/restaurant/option';

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

// 비로그인 사용 기능: 식당 고르기는 로그인 없이 접근 가능 (로그인 게이트 제거)
export default SelectRestaurantPage;
