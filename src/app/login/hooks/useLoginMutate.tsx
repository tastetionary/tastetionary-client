import authRepository from '@/apis/auth';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const sessionStorage = typeof window !== undefined ? window.sessionStorage : undefined;

const useLoginMutate = () => {
  const { push } = useRouter();

  const { mutate } = useMutation(authRepository().postLogin, {
    onSuccess: value => {
      (sessionStorage as Storage).setItem('token', value.data.accessToken);
      push('/');
    },
  });

  return { mutate };
};

export default useLoginMutate;
