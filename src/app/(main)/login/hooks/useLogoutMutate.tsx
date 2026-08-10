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
      Sentry.configureScope(scope => scope.clear());

      // 지역은 계정에만 있으므로, 쿼리 캐시가 비워지면 함께 사라진다. (아래 useEffect의 queryClient.clear)
      setIsDestroied(true);
      destroyCookie(null, 'token');
    },
  });
};

export default useLogoutMutate;
