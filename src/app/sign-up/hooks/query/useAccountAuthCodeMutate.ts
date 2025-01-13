import { getRegisterRepository } from '@/apis/register';
import { MODAL_TYPES } from '@/components/Modal/GlobalModal';
import useModal from '@/components/Modal/GlobalModal/hooks/useModal';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';

interface Props {
  onNext: () => void;
  setEmailAuthId?: (value: number) => void;
  setCompanyEmailAuthId?: (value: number) => void;
  category: 'account' | 'company';
  type?: 'retry';
}

const useAccountAuthCodeMutate = ({ onNext, setEmailAuthId, setCompanyEmailAuthId, category, type }: Props) => {
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
      category === 'account' ? setEmailAuthId?.(authId) : setCompanyEmailAuthId?.(authId);
    }
  }, [data]);

  return { data, mutate };
};

export default useAccountAuthCodeMutate;
