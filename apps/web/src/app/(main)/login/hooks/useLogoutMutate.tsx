import * as Sentry from '@sentry/nextjs';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { destroyCookie } from 'nookies';
import { useEffect, useState } from 'react';
import authRepository from '@/shared/api/auth';
import useToken from '@/shared/hooks/useToken';

const useLogoutMutate = () => {
  const queryClient = useQueryClient();
  const { push } = useRouter();
  const { token } = useToken();

  const [isDestroied, setIsDestroied] = useState(false);

  useEffect(() => {
    if (!isDestroied || token) {
      return;
    }

    queryClient.clear();
    push('/explore');
    setIsDestroied(false);
  }, [token, isDestroied]);

  return useMutation({
    mutationFn: authRepository().postLogout,
    onSuccess: () => {
      Sentry.getCurrentScope().clear();

      // 지역은 계정에만 있으므로, 쿼리 캐시가 비워지면 함께 사라진다. (아래 useEffect의 queryClient.clear)
      setIsDestroied(true);
      // 로그인 때 path '/' 로 심은 쿠키라, path 를 맞추지 않으면 현재 URL 경로 기준으로 지워져 실제 쿠키가 남는다
      destroyCookie(null, 'token', { path: '/' });
    },
  });
};

export default useLogoutMutate;
