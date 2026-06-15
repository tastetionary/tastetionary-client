import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { getRegisterRepository } from '@/apis/register';

interface Props {
  onNext: () => void;
  setCompanyEmailAuthId: (value: number) => void;
}

const useCompanyAuthCodeMutate = ({ onNext, setCompanyEmailAuthId }: Props) => {
  const { data, mutate } = useMutation({
    mutationFn: getRegisterRepository().postCompanyAuthCode,
    onSuccess: () => onNext(),
  });

  useEffect(() => {
    if (data) {
      setCompanyEmailAuthId(data.id as number);
    }
  }, [data]);

  return { mutate };
};

export default useCompanyAuthCodeMutate;
