import authRepository from '@/apis/auth';
import { getUser } from '@/apis/user/getUser';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const useLoginMutate = () => {
  const { push } = useRouter();

  const [token, setToken] = useState('');

  const { mutate } = useMutation(authRepository().postLogin, {
    onSuccess: value => {
      setToken(value.data.accessToken);

      if (typeof window === undefined) return;
      (sessionStorage as Storage).setItem('token', value.data.accessToken);
      push('/');
    },
  });

  const data = useQuery(['user'], () => getUser(token), {
    enabled: token !== '',
    staleTime: Infinity, // token 값을 받으면 user 정보를 받아와 react-query에 저장
    cacheTime: 1000 * 60 * 60 * 24, // 24 hours
  });

  return { mutate };
};

export default useLoginMutate;
