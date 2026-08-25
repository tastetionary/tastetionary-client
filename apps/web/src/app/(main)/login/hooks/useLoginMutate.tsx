import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { setCookie } from 'nookies';
import authRepository from '@/shared/api/auth';
import { getUser } from '@/shared/api/user/getUser';
import { ERROR_MSG } from '@/shared/constants/error-msg';
import { MODAL_TYPES } from '@/shared/ui/Modal/GlobalModal';
import useModal from '@/shared/ui/Modal/GlobalModal/hooks/useModal';

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

  const { mutate, isSuccess, data } = useMutation({
    mutationFn: authRepository().postLogin,
    onSuccess: value => {
      const token = value.accessToken;
      const expirationDate = new Date(value.accessTokenExpiredAt);

      setCookie(null, 'token', token, {
        path: '/',
        expires: expirationDate,
      });

      console.log('login 후 token', token);
      console.log('token 만료일', value.accessTokenExpiredAt);

      getUserInfo(token);
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
      console.log('getUserInfo 성공', res);

      // 지역의 단일 소스는 계정이므로, 서버가 내려준 area를 그대로 사용한다.
      queryClient.setQueryData(['user'], res);

      push('/explore');
    },
  });

  return { mutate, isSuccess, data };
};

export default useLoginMutate;
