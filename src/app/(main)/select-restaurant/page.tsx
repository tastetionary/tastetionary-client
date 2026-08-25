import { QueryClient, dehydrate } from '@tanstack/query-core';
import { HydrationBoundary } from '@tanstack/react-query';
import SelectRestaurant from './components/SelectRestaurant';
import { getRestaurantOption } from '@/features/recommendation/api/restaurant/option';

// 로그인 게이트는 src/proxy.ts 에서 처리한다.
// (레이아웃의 Suspense 때문에 서버 컴포넌트에서 redirect() 하면 307이 나가지 못하고 빈 화면이 된다.)
export default async function SelectRestaurantPage() {
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
