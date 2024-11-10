import authRepository from '@/apis/auth';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const useValidationNickname = () => {
  const { mutate } = useMutation(['nickname'], authRepository().getValidateNickname, {
    onSuccess: () => {
      toast.success('닉네임 입력이 완료되었습니다.');
    },
  });

  return { validateNicknameMutate: mutate };
};

export default useValidationNickname;
