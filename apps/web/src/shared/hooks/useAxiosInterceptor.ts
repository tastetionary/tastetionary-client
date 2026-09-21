import * as Sentry from '@sentry/nextjs';
import { useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useRouter } from 'next/navigation';
import { destroyCookie } from 'nookies';
import { useEffect } from 'react';
import useToken from './useToken';
import { axiosInstance } from '@/shared/api/http';
import { useModalStore } from '@/shared/store/useModalStore';
import { MODAL_TYPES } from '@/shared/ui/Modal/GlobalModal';
import useModal from '@/shared/ui/Modal/GlobalModal/hooks/useModal';
import { ERROR_CODE } from '@/shared/utils/error-code';
import { saveLoginRedirect } from '@/shared/utils/login-redirect';

const PUBLIC_DOMAIN = [
  {
    domain: '/account/tokens',
    method: 'post',
  },
  {
    domain: '/account/password',
    method: 'put',
  },
  {
    domain: '/authentication/',
    method: 'post',
  },
  {
    domain: '/configuration/',
    method: 'get',
  },
  {
    domain: '/option',
    method: 'get',
  },
  {
    domain: '/food/recommendation',
    method: 'post',
  },
  {
    domain: '/user',
    method: 'post',
  },
];

const SESSION_EXPIRED_TITLE = '로그인이 만료되었어요';

export const useAxiosInterceptor = () => {
  const { token } = useToken();
  const { openModal, closeModal } = useModal();
  const queryClient = useQueryClient();
  const { push } = useRouter();

  const errorTrigger = () => {
    openModal(MODAL_TYPES.dialog, {
      title: '에러가 발생했습니다.',
      handleConfirm: () => closeModal(MODAL_TYPES.dialog),
      confirmText: '확인',
      needClose: true,
    });
  };

  const serverErrorTrigger = (code: keyof typeof ERROR_CODE, originMessage?: string) => {
    openModal(MODAL_TYPES.dialog, {
      title: ERROR_CODE[code] || originMessage || '문제가 발생했습니다.', // 서버에서 보내는 에러 메시지가 있으면 보여주기
      handleConfirm: () => closeModal(MODAL_TYPES.dialog),
      confirmText: '확인',
      needClose: true,
    });
  };

  const sessionExpiredTrigger = () => {
    // 한 화면에서 여러 요청이 동시에 401을 받아도 모달은 하나만 띄운다
    const isOpen = useModalStore.getState().modals.some(modal => modal.props.title === SESSION_EXPIRED_TITLE);
    if (isOpen) return;

    openModal(MODAL_TYPES.dialog, {
      title: SESSION_EXPIRED_TITLE,
      message: '다시 로그인하면 보던 화면에서\n이어서 이용할 수 있어요.',
      cancelText: '닫기',
      confirmText: '로그인하기',
      needClose: true,
      handleClose: () => closeModal(MODAL_TYPES.dialog),
      handleConfirm: () => {
        saveLoginRedirect(`${window.location.pathname}${window.location.search}`);
        push('/login');
      },
    });
  };

  const requestInterceptor = axiosInstance.interceptors.request.use(
    (request: any) => {
      const { url, method } = request;

      const isPublic = PUBLIC_DOMAIN.find(d => url.includes(d.domain) && method.toLowerCase() === d.method);

      if (!isPublic && token) {
        request.headers.Authorization = `Bearer ${token}`;
        return { ...request };
      }

      return request;
    },
    (error: any) => {
      Sentry.captureException(error);
      return Promise.reject(error);
    }
  );

  const responseInterceptor = axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      if (response.data && response.data.data) {
        return {
          ...response,
          data: response.data.data, // response.data를 가공된 형태로 교체
        };
      }
      return response;
    },
    (error: any) => {
      const { method, url, params, data: requestData, headers } = error.config ?? {};
      Sentry.setContext('API Request Detail', {
        method,
        url,
        params,
        requestData,
        headers,
      });

      if (error.response) {
        const { data, status } = error.response;

        Sentry.setContext('API Response Detail', {
          status,
          data,
        });
      }

      // 여기서 모달을 띄웠더라도 에러는 그대로 던진다.
      // (예전에는 return 으로 삼켜서 호출부가 response 없는 TypeError 를 받았고, onError 분기가 전부 죽어 있었다.)
      // 호출부는 handledByInterceptor 로 공용 모달이 이미 떴는지 확인해 팝업이 두 번 뜨지 않게 한다.
      const rejectHandled = () => {
        error.handledByInterceptor = true;
        return Promise.reject(error);
      };

      // 호출부가 에러 안내를 직접 하는 요청 (예: 로그인)
      if (error.config?.skipGlobalErrorModal) {
        return Promise.reject(error);
      }

      if (error.response?.data?.statusCode === 400) {
        serverErrorTrigger(error.response.data.errorCode, error.response.data.originMessage);
        return rejectHandled();
      }

      if (error.response?.data?.statusCode === 401) {
        // 만료된 토큰 쿠키를 남겨두면 useUser가 로그인 상태로 보고 ['user']를 다시 요청해 401이 무한 반복된다
        destroyCookie(null, 'token', { path: '/' });
        sessionExpiredTrigger();
        queryClient.removeQueries({ queryKey: ['user'] });
        queryClient.setQueryData(['user'], undefined);
        return rejectHandled();
      }

      if (error.response?.data?.statusCode === 404) {
        errorTrigger();
        return rejectHandled();
      }

      if (error.response?.data?.errorCode in ERROR_CODE) {
        serverErrorTrigger(error.response.data.errorCode);
        return rejectHandled();
      }

      Sentry.captureException(error);
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [requestInterceptor, responseInterceptor]);
};
