import authRepository from '@/apis/auth';
import { getUser } from '@/apis/user/getUser';
import { MODAL_TYPES } from '@/components/Modal/GlobalModal';
import useModal from '@/components/Modal/GlobalModal/hooks/useModal';
import { ERROR_MSG } from '@/constants/error-msg';
import useToken from '@/hooks/useToken';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { setCookie } from 'nookies';

interface ErrorType {
  category: string;
  originMessage: string;
  path: string;
  statusCode: string;
  timestamp: string;
}

const useLoginMutate = () => {
  const queryClient = useQueryClient();
  const { push } = useRouter();
  const { openModal, closeModal } = useModal();
  const { token } = useToken();

  const noRegisterModal = () => {
    openModal(MODAL_TYPES.dialog, {
      title: '회원가입이 필요한 계정입니다. \n 회원가입으로 이동하시겠습니까?',
      handleConfirm: () => push('/sign-up'),
      handleClose: () => closeModal(MODAL_TYPES.dialog),
      cancelText: '취소',
      confirmText: '이동',
      needClose: true,
    });
  };

  const invalidEmailModal = () => {
    openModal(MODAL_TYPES.dialog, {
      title: '아이디 또는 비밀번호가 일치하지 않습니다.',
      handleConfirm: () => closeModal(MODAL_TYPES.dialog),
      confirmText: '확인',
      needClose: true,
    });
  };

  const { mutate } = useMutation({
    mutationFn: authRepository().postLogin,
    onSuccess: value => {
      const token = value.data.accessToken;

      setCookie(null, 'token', token, {
        path: '/',
        sameSite: 'lax',
      });

      setTimeout(() => {
        getUserInfo(token);
      }, 100);
    },
    onError: (errors: AxiosError<ErrorType>) => {
      if (errors.response?.data.originMessage === ERROR_MSG['NO_REGISTER']) {
        noRegisterModal();
        return;
      }
      if (errors.response?.data.originMessage === ERROR_MSG['INVALID_ID_OR_PASSWORD']) {
        invalidEmailModal();
        return;
      }
    },
  });

  const { mutate: getUserInfo } = useMutation({
    mutationFn: (token: string) => getUser(token),
    onSuccess: res => {
      queryClient.setQueryData(['user'], res);

      push('/');
    },
  });

  return { mutate };
};

export default useLoginMutate;
