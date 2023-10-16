import { getRegisterRepository } from '@/apis/register';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';

interface Props {
  onNext: () => void;
  setEmailAuthId: (value: number) => void;
}

const useAccountAuthCodeMutate = ({ onNext, setEmailAuthId }: Props) => {
  const { data, mutate } = useMutation(getRegisterRepository().postAccountAuthCode, {
    onSuccess: () => onNext(),
  });

  useEffect(() => {
    if (data) {
      setEmailAuthId(data?.data.id as number);
    }
  }, [data]);

  return { data, mutate };
};

export default useAccountAuthCodeMutate;
