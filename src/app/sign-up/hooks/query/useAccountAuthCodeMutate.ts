import { getRegisterRepository } from '@/apis/register';
import { useMutation } from '@tanstack/react-query';

interface Props {
  onNext: () => void;
}

const useAccountAuthCodeMutate = ({ onNext }: Props) => {
  const { mutate } = useMutation(getRegisterRepository().postAccountAuthCode, {
    onSuccess: () => onNext(),
  });

  return { mutate };
};

export default useAccountAuthCodeMutate;
