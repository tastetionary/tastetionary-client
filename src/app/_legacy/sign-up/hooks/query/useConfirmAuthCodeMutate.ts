import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import authRepository from '@/apis/auth';
import { getRegisterRepository } from '@/apis/register';
import { MODAL_TYPES } from '@/components/Modal/GlobalModal';
import useModal from '@/components/Modal/GlobalModal/hooks/useModal';

interface Props {
  onNext: () => void;
  type: 'register' | 'find-password';
  saveAuthId?: (authenticationId: number) => void;
}

const useConfirmAuthCodeMutate = ({ onNext, type, saveAuthId }: Props) => {
  const { openModal, closeModal } = useModal();
  const router = useRouter();

  const authCompleteModal = (type: 'register' | 'find-password') => {
    if (type === 'register') {
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

    if (type === 'find-password') {
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
