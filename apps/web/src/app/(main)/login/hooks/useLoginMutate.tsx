import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { setCookie } from 'nookies';
import authRepository from '@/shared/api/auth';
import { getUser } from '@/shared/api/user/getUser';
import { ERROR_MSG } from '@/shared/constants/error-msg';
import { MODAL_TYPES } from '@/shared/ui/Modal/GlobalModal';
import useModal from '@/shared/ui/Modal/GlobalModal/hooks/useModal';
import { ERROR_CODE } from '@/shared/utils/error-code';
import { consumeLoginRedirect } from '@/shared/utils/login-redirect';

interface ErrorType {
  category: string;
  errorCode?: string;
  originMessage: string;
  path: string;
  statusCode: string;
  timestamp: string;
}

const useLoginMutate = () => {
  const queryClient = useQueryClient();
  const { push, replace } = useRouter();
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

  const loginFailedModal = (errorCode?: string) => {
    openModal(MODAL_TYPES.dialog, {
      title: (errorCode && ERROR_CODE[errorCode as keyof typeof ERROR_CODE]) || '로그인에 실패했어요.',
      message: '잠시 후 다시 시도해주세요.',
      handleConfirm: () => closeModal(MODAL_TYPES.dialog),
      confirmText: '확인',
      needClose: true,
    });
  };

  const { mutate, isSuccess, isError, data } = useMutation({
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

      // 로그인 요청은 공용 인터셉터의 에러 모달을 끄고 있으므로(skipGlobalErrorModal) 나머지 실패도 여기서 안내한다
      loginFailedModal(errors.response?.data.errorCode);
    },
  });

  const { mutate: getUserInfo } = useMutation({
    mutationFn: (token: string) => getUser(token),
    onSuccess: res => {
      console.log('getUserInfo 성공', res);

      // 지역의 단일 소스는 계정이므로, 서버가 내려준 area를 그대로 사용한다.
      queryClient.setQueryData(['user'], res);

      // 세션 만료로 로그인하러 온 경우 보던 화면으로 돌려보낸다.
      // push 로 가면 /login/callback?code=… 가 히스토리에 남아, 뒤로가기 때 이미 쓴 인가 코드를 다시 보내게 된다.
      replace(consumeLoginRedirect());
    },
    // 토큰은 이미 발급됐으므로 로그인은 된 상태다. 사용자 정보는 이동한 화면에서 useUser 가 다시 받아온다.
    onError: () => replace(consumeLoginRedirect()),
  });

  return { mutate, isSuccess, isError, data };
};

export default useLoginMutate;
