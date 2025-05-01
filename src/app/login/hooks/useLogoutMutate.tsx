import authRepository from '@/apis/auth';
import * as Sentry from '@sentry/nextjs';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { destroyCookie, parseCookies } from 'nookies';

const useLogoutMutate = () => {
  const queryClient = useQueryClient();
  const { push } = useRouter();
  const cookies = parseCookies();

  return useMutation({
    mutationFn: authRepository().postLogout,
    onSuccess: () => {
      Sentry.configureScope(scope => scope.clear());

      destroyCookie(null, 'token');

      if (!cookies.token) {
        queryClient.clear();
        push('/');
      }
    },
  });
};

export default useLogoutMutate;
