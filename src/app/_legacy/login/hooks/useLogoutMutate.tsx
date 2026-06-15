import authRepository from '@/apis/auth';
import useToken from '@/hooks/useToken';
import * as Sentry from '@sentry/nextjs';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { destroyCookie } from 'nookies';
import { useEffect, useState } from 'react';

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

      setIsDestroied(true);
      destroyCookie(null, 'token');
    },
  });
};

export default useLogoutMutate;
