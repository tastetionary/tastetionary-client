import { useMutation } from '@tanstack/react-query';
import { getRegisterRepository } from '@/shared/api/register';
import { MODAL_TYPES } from '@/shared/ui/Modal/GlobalModal';
import useModal from '@/shared/ui/Modal/GlobalModal/hooks/useModal';

interface Props {
  /** 인증 메일 발송에 성공하면 호출된다. historyId 는 이후 인증 코드 확인 요청에 쓴다 */
  onSent: (historyId: number) => void;
  type?: 'retry';
}

const useAccountAuthCodeMutate = ({ onSent, type }: Props) => {
  const { openModal, closeModal } = useModal();

  const emailRetryModal = () => {
    openModal(MODAL_TYPES.dialog, {
      title: '이메일 전송 완료',
      message: '이메일을 다시 전송하였습니다.',
      handleConfirm: () => closeModal(MODAL_TYPES.dialog),
      confirmText: '확인',
      needClose: true,
    });
  };

  const { mutate, isPending } = useMutation({
    mutationFn: getRegisterRepository().postAccountAuthCode,
    onSuccess: data => {
      onSent(data.id);

      if (type === 'retry') emailRetryModal();
    },
  });

  return { mutate, isPending };
};

export default useAccountAuthCodeMutate;
