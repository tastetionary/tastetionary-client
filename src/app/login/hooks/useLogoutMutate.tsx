import authRepository from '@/apis/auth';
import { queryClient } from '@/lib/react-query/ReactQueryProvider';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const useLogoutMutate = () => {
  const { push } = useRouter();

  const { mutate } = useMutation(authRepository().postLogout, {
    onSuccess: () => {
      queryClient.removeQueries();

      if (typeof window === undefined) return;
      (sessionStorage as Storage).removeItem('token');
      push('/');
    },
  });

  return { mutate };
};

export default useLogoutMutate;
