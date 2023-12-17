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

  const responseInterceptor = http.client.interceptors.response.use(
    (response: AxiosResponse) => {
      console.log('axios response!!!!');
      return response;
    },
    (error: any) => {
      if (error.response.data.statusCode >= 400) {
        errorTrigger();
      }

      Sentry.captureException(error);
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    return () => {
      http.client.interceptors.response.eject(responseInterceptor);
    };
  }, [responseInterceptor]);
};
