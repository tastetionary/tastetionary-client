import { getRegisterRepository } from '@/apis/register';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';

interface Props {
  onNext: () => void;
  setCompanyEmailAuthId: (value: number) => void;
}

const useCompanyAuthCodeMutate = ({ onNext, setCompanyEmailAuthId }: Props) => {
  const { data, mutate } = useMutation(getRegisterRepository().postCompanyAuthCode, {
    onSuccess: () => onNext(),
  });

  useEffect(() => {
    if (data) {
      setCompanyEmailAuthId(data?.data.id as number);
    }
  }, [data]);

  return { mutate };
};

export default useCompanyAuthCodeMutate;
