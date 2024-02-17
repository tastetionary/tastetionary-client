import http from '@/apis/http';
import { MODAL_TYPES } from '@/components/Modal/GlobalModal';
import useModal from '@/components/Modal/GlobalModal/hooks/useModal';
import * as Sentry from '@sentry/nextjs';
import { AxiosResponse } from 'axios';
import { useEffect } from 'react';

export const useAxiosInterceptor = () => {
  const { openModal, closeModal } = useModal();

  const errorTrigger = () => {
    openModal(MODAL_TYPES.dialog, {
      title: '에러가 발생했습니다.',
      handleConfirm: () => closeModal(MODAL_TYPES.dialog),
      confirmText: '확인',
      needClose: true,
    });
  };

  const requestInterceptor = http.client.interceptors.response.use(
    (request: any) => {
      // 토큰이 없을때 타는 로직
      if (typeof window === undefined) return request;

      if (request.headers.Authorization?.toString().split(' ')[1] === 'null') {
        const token = (sessionStorage as Storage).getItem('token');
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

  const responseInterceptor = http.client.interceptors.response.use(
    (response: AxiosResponse) => {
      console.log('axios response!!!!');
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

      // 호진FIXME: 해당 부분에서 400이상의 모든 에러를 처리하면 컴포넌트 레벨에서 에러를 추가할때 에러가 2번 발생함 ( 해당 파일에서 발생 + 컴포넌트에서 에러 팝업 발생)
      if (error.response.data.statusCode === 404) {
        errorTrigger();
      }

      Sentry.captureException(error);
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    return () => {
      http.client.interceptors.response.eject(requestInterceptor);
      http.client.interceptors.response.eject(responseInterceptor);
    };
  }, [requestInterceptor, responseInterceptor]);
};
