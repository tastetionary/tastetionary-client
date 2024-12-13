import authRepository from '@/apis/auth';
import getQueryClient from '@/lib/react-query/getQueryClient';
import * as Sentry from '@sentry/nextjs';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { destroyCookie } from 'nookies';

const useLogoutMutate = () => {
  const queryClient = getQueryClient();
  const { push } = useRouter();

  const { mutate } = useMutation(authRepository().postLogout, {
    onSuccess: () => {
      destroyCookie(null, 'token');
      Sentry.configureScope(scope => scope.clear());

      push('/');

      queryClient.clear();
    },
  });

  return { mutate };
};

export default useLogoutMutate;
