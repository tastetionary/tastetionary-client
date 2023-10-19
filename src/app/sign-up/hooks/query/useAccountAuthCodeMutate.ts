import { getRegisterRepository } from '@/apis/register';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';

interface Props {
  onNext: () => void;
  setEmailAuthId?: (value: number) => void;
  setCompanyEmailAuthId?: (value: number) => void;
  category: 'account' | 'company';
}

const useAccountAuthCodeMutate = ({ onNext, setEmailAuthId, setCompanyEmailAuthId, category }: Props) => {
  const { data, mutate } = useMutation(getRegisterRepository().postAccountAuthCode, {
    onSuccess: () => onNext(),
  });

  useEffect(() => {
    if (data) {
      const authId = data.data.id as number;
      category === 'account' ? setEmailAuthId?.(authId) : setCompanyEmailAuthId?.(authId);
    }
  }, [data]);

  return { data, mutate };
};

export default useAccountAuthCodeMutate;
