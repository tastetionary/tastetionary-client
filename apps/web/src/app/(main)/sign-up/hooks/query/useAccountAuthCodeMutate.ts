import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { getRegisterRepository } from '@/shared/api/register';
import { MODAL_TYPES } from '@/shared/ui/Modal/GlobalModal';
import useModal from '@/shared/ui/Modal/GlobalModal/hooks/useModal';

interface Props {
  onNext: () => void;
  setEmailAuthId?: (value: number) => void;
  type?: 'retry';
}

const useAccountAuthCodeMutate = ({ onNext, setEmailAuthId, type }: Props) => {
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

  const { data, mutate } = useMutation({
    mutationFn: getRegisterRepository().postAccountAuthCode,
    onSuccess: () => (type === 'retry' ? emailRetryModal() : onNext()),
  });

  useEffect(() => {
    if (data) {
      const authId = data.id as number;
      setEmailAuthId?.(authId);
    }
  }, [data]);

  return { data, mutate };
};

export default useAccountAuthCodeMutate;
