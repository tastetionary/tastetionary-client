import { useMutation } from '@tanstack/react-query';
import authRepository from '@/apis/auth';
import { iconToast } from '@/components/Toast';

const useValidationNickname = () => {
  const { mutate, ...rest } = useMutation({
    mutationKey: ['nickname'],
    mutationFn: authRepository().getValidateNickname,
    onSuccess: () => {
      iconToast('사용 가능한 닉네임입니다.', 'check');
    },
  });

  return { validateNicknameMutate: mutate, ...rest };
};

export default useValidationNickname;
