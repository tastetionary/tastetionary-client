import { useMutation } from '@tanstack/react-query';
import { getRegisterRepository } from '@/shared/api/register';

interface Props {
  onNext: () => void;
}

const useRegisterUserMutate = ({ onNext }: Props) => {
  const { mutate, isPending } = useMutation({
    mutationFn: getRegisterRepository().postRegisterUser,
    onSuccess: () => onNext(),
  });

  return { mutate, isPending };
};

export default useRegisterUserMutate;
