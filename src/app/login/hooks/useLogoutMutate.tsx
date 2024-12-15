import authRepository from '@/apis/auth';
import * as Sentry from '@sentry/nextjs';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { destroyCookie } from 'nookies';

const useLogoutMutate = () => {
  const queryClient = useQueryClient();
  const { push } = useRouter();

  const { mutate } = useMutation(authRepository().postLogout, {
    onSuccess: () => {
      Sentry.configureScope(scope => scope.clear());
      setTimeout(() => {
        destroyCookie(null, 'token');
        queryClient.clear();
      }, 100);
      push('/');
    },
  });

  return { mutate };
};

export default useLogoutMutate;
