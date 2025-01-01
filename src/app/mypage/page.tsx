import { getUser } from '@/apis/user/getUser';
import { QueryClient, dehydrate } from '@tanstack/query-core';
import { HydrationBoundary } from '@tanstack/react-query';
import { cookies } from 'next/headers';
import MyPagePage from './components/MyPagePage';

async function MyPage() {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;

  const queryClient = new QueryClient();

  if (token) {
    // Pre-fetching data server-side
    await queryClient.prefetchQuery({
      queryKey: ['user'],
      queryFn: () => getUser(token),
      staleTime: 1000 * 60 * 60 * 24, // 서버에서 설정한 staleTime
    });
  }

  // Dehydrating the state for client-side hydration
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <MyPagePage isLoggedIn={Boolean(token)} token={token} />
    </HydrationBoundary>
  );
}

export default MyPage;
