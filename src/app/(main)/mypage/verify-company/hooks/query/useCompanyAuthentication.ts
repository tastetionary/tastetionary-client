import { useMutation } from '@tanstack/react-query';
import { getUserCompanyRepository } from '@/shared/api/user/company';
import useUser from '@/shared/hooks/useUser';
import { MODAL_TYPES } from '@/shared/ui/Modal/GlobalModal';
import useModal from '@/shared/ui/Modal/GlobalModal/hooks/useModal';

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

  const { data, mutate } = useMutation({
    mutationFn: () =>
      getUserCompanyRepository().postRequestCompanyAuthCode({
        type: 'email',
        identification: email,
        token,
      }),
    onSuccess: res => (type === 'retry' ? emailRetryModal() : onNext(res.id)),
  });

  return {
    data,
    mutate,
  };
}
