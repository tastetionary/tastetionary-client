import { setUser } from '@sentry/nextjs';
import { UseQueryResult, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import useToken from './useToken';
import { UserRes, getUser } from '@/shared/api/user/getUser';

type UseUserResult = Partial<UseQueryResult<UserRes, any>> & {
  isLoggedIn: boolean;
  token: string | undefined;
  hasActivityArea: boolean;
};

export default function useUser(): UseUserResult {
  const { token } = useToken();
  const queryClient = useQueryClient();

  // 토큰이 없어질 때 (만료되어 쿠키 삭제) 사용자 쿼리 캐시 제거
  useEffect(() => {
    if (!token) {
      queryClient.removeQueries({ queryKey: ['user'] });
      queryClient.setQueryData(['user'], undefined);
    }
  }, [token, queryClient]);

  const res = useQuery<UserRes>({
    queryKey: ['user'],
    queryFn: () => getUser(token ?? ''),
    enabled: !!token,
    staleTime: 1000,
    initialData: token ? queryClient.getQueryData(['user']) : undefined,
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
