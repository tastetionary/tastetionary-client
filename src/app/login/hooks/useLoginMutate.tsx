import authRepository from '@/apis/auth';
import { getUser } from '@/apis/user/getUser';
import { MODAL_TYPES } from '@/components/Modal/GlobalModal';
import useModal from '@/components/Modal/GlobalModal/hooks/useModal';
import { ERROR_MSG } from '@/constants/error-msg';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface ErrorType {
  category: string;
  originMessage: string;
  path: string;
  statusCode: string;
  timestamp: string;
}

const useLoginMutate = () => {
  const { push } = useRouter();

  const [token, setToken] = useState('');
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

  const { mutate } = useMutation(authRepository().postLogin, {
    onSuccess: value => {
      setToken(value.data.accessToken);

      if (!typeof window || typeof window === 'undefined') return;
      (sessionStorage as Storage).setItem('token', value.data.accessToken);
      push('/');
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

  const data = useQuery(['user'], () => getUser(token), {
    enabled: token !== '',
    staleTime: Infinity, // token 값을 받으면 user 정보를 받아와 react-query에 저장
    cacheTime: 1000 * 60 * 60 * 24, // 24 hours
  });

  return { mutate };
};

export default useLoginMutate;
