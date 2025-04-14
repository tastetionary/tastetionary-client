import authRepository from '@/apis/auth';
import { iconToast } from '@/components/Toast';
import { useMutation } from '@tanstack/react-query';

const useValidationNickname = () => {
  const { mutate, ...rest } = useMutation({
    mutationKey: ['nickname'],
    mutationFn: authRepository().getValidateNickname,
    onSuccess: () => {
      iconToast('닉네임 입력이 완료되었습니다.', 'check');
    },
  });

  return { validateNicknameMutate: mutate, ...rest };
};

export default useValidationNickname;
