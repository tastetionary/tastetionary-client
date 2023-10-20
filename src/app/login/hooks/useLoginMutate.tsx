import authRepository from '@/apis/auth';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const useLoginMutate = () => {
  const { push } = useRouter();

  const { mutate } = useMutation(authRepository().postLogin, {
    onSuccess: () => push('/'),
  });

  return { mutate };
};

export default useLoginMutate;
