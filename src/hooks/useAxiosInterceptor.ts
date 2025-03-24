import { axiosInstance } from '@/apis/http';
import { MODAL_TYPES } from '@/components/Modal/GlobalModal';
import useModal from '@/components/Modal/GlobalModal/hooks/useModal';
import { ERROR_CODE } from '@/utils/error-code';
import * as Sentry from '@sentry/nextjs';
import { AxiosResponse } from 'axios';
import { useEffect } from 'react';
import useToken from './useToken';

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

export const useAxiosInterceptor = () => {
  const { token } = useToken();
  const { openModal, closeModal } = useModal();

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

  const requestInterceptor = axiosInstance.interceptors.request.use(
    (request: any) => {
      const { url, method } = request;

      console.log(url, method);

      const isPublic = PUBLIC_DOMAIN.find(d => url.includes(d.domain) && method.toLowerCase() === d.method);

      if (!isPublic && token) {
        request.headers.Authorization = `Bearer ${token}`;
        return { ...request };
      }

      return request;
    },
    (error: any) => {
      console.log('error', error);

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
      console.log(error);

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

      if (error.response.data.statusCode === 400) {
        serverErrorTrigger(error.response.data.errorCode, error.response.data.originMessage);

        return;
      }

      // 호진FIXME: 해당 부분에서 400이상의 모든 에러를 처리하면 컴포넌트 레벨에서 에러를 추가할때 에러가 2번 발생함 ( 해당 파일에서 발생 + 컴포넌트에서 에러 팝업 발생)
      if (error.response.data.statusCode === 404) {
        errorTrigger();
        return;
      }

      if (error.response.data.errorCode in ERROR_CODE) {
        serverErrorTrigger(error.response.data.errorCode);
        return;
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
