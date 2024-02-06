import { getUserCompanyRepository } from '@/apis/user/company';
import { MODAL_TYPES } from '@/components/Modal/GlobalModal';
import useModal from '@/components/Modal/GlobalModal/hooks/useModal';
import useUser from '@/hooks/useUser';
import { useMutation } from '@tanstack/react-query';

interface Props {
  email: string;
  type?: 'retry';
  onNext: (id: number) => void;
}

export default function useCompanyAuthentication({ email, type, onNext }: Props) {
  const { token } = useUser();
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

  const { data, mutate } = useMutation(
    () =>
      getUserCompanyRepository().postRequestCompanyAuthCode({
        type: 'email',
        identification: email,
        token,
      }),
    {
      onSuccess: data => (type === 'retry' ? emailRetryModal() : onNext(data.data.id)),
    }
  );

  return {
    data,
    mutate,
  };
}
