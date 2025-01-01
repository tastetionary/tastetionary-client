import { UserRes, getUser } from '@/apis/user/getUser';
import { setUser } from '@sentry/nextjs';
import { QueryClient, UseQueryResult, useQuery } from '@tanstack/react-query';
import useToken from './useToken';

type UseUserResult = Partial<UseQueryResult<UserRes, any>> & {
  isLoggedIn: boolean;
  token: string | undefined;
  hasActivityArea: boolean;
};

export default function useUser(): UseUserResult {
  const { token } = useToken();
  const queryClient = new QueryClient();

  // 토큰이 없을 경우
  if (!token) {
    return {
      isLoggedIn: false,
      token: undefined,
      hasActivityArea: false,
    };
  }

  // 토큰이 있을 경우
  const res = useQuery<UserRes>({
    queryKey: ['user'],
    queryFn: () => getUser(token),
    enabled: !!token,
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
    initialData: queryClient.getQueryData(['user']),
  });

  if (res.data) {
    setUser({
      id: res.data.id,
      username: res.data.nickname,
      email: res.data.account?.accountEmail || '',
    });
  }

  return {
    isLoggedIn: true,
    token,
    hasActivityArea: res?.data && token ? Boolean(res.data?.area?.address) : false,
    ...res,
  };
}
