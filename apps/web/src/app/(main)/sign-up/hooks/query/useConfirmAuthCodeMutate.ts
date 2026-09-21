import { useMutation } from '@tanstack/react-query';
import authRepository from '@/shared/api/auth';
import { getRegisterRepository } from '@/shared/api/register';
import { MODAL_TYPES } from '@/shared/ui/Modal/GlobalModal';
import useModal from '@/shared/ui/Modal/GlobalModal/hooks/useModal';

interface Props {
  type: 'register' | 'find-password';
  /** 회원가입이면 인증이 끝난 authenticationId 를 넘겨준다. 비밀번호 찾기는 임시 비밀번호가 메일로 나가므로 값이 없다 */
  onNext: (authenticationId?: number) => void;
}

const useConfirmAuthCodeMutate = ({ type, onNext }: Props) => {
  const { openModal, closeModal } = useModal();

  const authCompleteModal = (authenticationId: number) => {
    openModal(MODAL_TYPES.dialog, {
      title: '인증 완료',
      message: '이메일 인증이 완료되었습니다.',
      handleConfirm: () => onNext(authenticationId),
      handleClose: () => closeModal(MODAL_TYPES.dialog),
      confirmText: '다음',
      needClose: true,
    });
  };

  const { mutate: resetPassword, isPending: isResetPending } = useMutation({
    mutationFn: authRepository().resetPassword,
    onSuccess: () => onNext(),
  });

  const { mutate: confirmCode, isPending: isConfirmPending } = useMutation({
    mutationFn: getRegisterRepository().postConfirmAuthCode,
    onSuccess: data => authCompleteModal(data.authenticationId),
  });

  return type === 'register'
    ? { mutate: confirmCode, isPending: isConfirmPending }
    : { mutate: resetPassword, isPending: isResetPending };
};

export default useConfirmAuthCodeMutate;
