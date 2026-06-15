import { useMutation } from '@tanstack/react-query';
import { getRegisterRepository } from '@/apis/register';

interface Props {
  onNext: () => void;
}

const useRegisterUserMutate = ({ onNext }: Props) => {
  const { mutate } = useMutation({
    mutationFn: getRegisterRepository().postRegisterUser,
    onSuccess: () => onNext(),
  });

  return { mutate };
};

export default useRegisterUserMutate;
