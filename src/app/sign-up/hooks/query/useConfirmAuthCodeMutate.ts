import { getRegisterRepository } from '@/apis/register';
import { MODAL_TYPES } from '@/components/Modal/GlobalModal';
import useModal from '@/components/Modal/GlobalModal/hooks/useModal';
import { useMutation } from '@tanstack/react-query';

interface Props {
  onNext: () => void;
  type: 'register' | 'find-password';
}

const useConfirmAuthCodeMutate = ({ onNext, type }: Props) => {
  const { openModal, closeModal } = useModal();

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
      openModal(MODAL_TYPES.dialog, {
        title: '인증 완료',
        message: '이메일 인증이 완료되었습니다.',
        handleConfirm: () => onNext(),
        handleClose: () => closeModal(MODAL_TYPES.dialog),
        confirmText: '임시 비밀번호 받기',
        needClose: true,
      });

      return;
    }
  };

  const { mutate } = useMutation(getRegisterRepository().postConfirmAuthCode, {
    onSuccess: () => authCompleteModal(type),
  });

  return { mutate };
};

export default useConfirmAuthCodeMutate;
