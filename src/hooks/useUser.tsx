import { UserRes, getUser } from '@/apis/user/getUser';
import { setUser } from '@sentry/nextjs';
import { UseQueryResult, useQuery, useQueryClient } from '@tanstack/react-query';
import useToken from './useToken';

type UseUserResult = Partial<UseQueryResult<UserRes, any>> & {
  isLoggedIn: boolean;
  token: string | undefined;
  hasActivityArea: boolean;
};

export default function useUser(): UseUserResult {
  const { token } = useToken();
  const queryClient = useQueryClient();

  console.log('useUser hook 호출!');

  const res = useQuery<UserRes>({
    queryKey: ['user', token],
    queryFn: () => getUser(token ?? ''),
    enabled: !!token,
    staleTime: 1000,
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
    isLoggedIn: !!token,
    token,
    hasActivityArea: res?.data && token ? Boolean(res.data?.area?.address) : false,
    ...res,
  };
}
