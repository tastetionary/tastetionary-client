import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import authRepository from '@/shared/api/auth';
import { getRegisterRepository } from '@/shared/api/register';
import { MODAL_TYPES } from '@/shared/ui/Modal/GlobalModal';
import useModal from '@/shared/ui/Modal/GlobalModal/hooks/useModal';

interface Props {
  onNext: () => void;
  type: 'register' | 'find-password';
  saveAuthId?: (authenticationId: number) => void;
}

const useConfirmAuthCodeMutate = ({ onNext, type, saveAuthId }: Props) => {
  const { openModal, closeModal } = useModal();
  const router = useRouter();

  const authCompleteModal = (authType: 'register' | 'find-password') => {
    if (authType === 'register') {
      openModal(MODAL_TYPES.dialog, {
        title: '인증 완료',
        message: '이메일 인증이 완료되었습니다.',
        handleConfirm: () => onNext(),
        handleClose: () => closeModal(MODAL_TYPES.dialog),
        confirmText: '다음',
        needClose: true,
      });

      return;
    }

    if (authType === 'find-password') {
      return router.push('/find-password/complete');
    }
  };

  const { mutate: resetPassword } = useMutation({
    mutationFn: authRepository().resetPassword,
    onSuccess: data => {
      saveAuthId?.(data.authenticationId);

      if (type === 'find-password') {
        return router.push('/find-password/complete');
      }

      authCompleteModal(type);
    },
  });

  const { mutate: confirmCode } = useMutation({
    mutationFn: getRegisterRepository().postConfirmAuthCode,
    onSuccess: data => {
      saveAuthId?.(data.authenticationId);

      authCompleteModal(type);
    },
  });

  return { mutate: type === 'register' ? confirmCode : resetPassword };
};

export default useConfirmAuthCodeMutate;
