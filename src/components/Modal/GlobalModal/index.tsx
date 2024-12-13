'use client';

import dynamic from 'next/dynamic';
import { FunctionComponent, useEffect } from 'react';
import useModal from './hooks/useModal';

const ExampleModal = dynamic(() => import('../ExampleModal'), { ssr: false });
const DialogModal = dynamic(() => import('../DialogModal'), { ssr: false });
const LoadingModal = dynamic(() => import('../LoadingModal'), { ssr: false });
const BottomModal = dynamic(() => import('../BottomModal'), { ssr: false });

// 사용할 모달 컴포넌트들을 담은 Object
export const MODAL_TYPES = {
  example: ExampleModal as FunctionComponent,
  dialog: DialogModal as FunctionComponent,
  loading: LoadingModal as FunctionComponent,
  bottom: BottomModal as FunctionComponent,
};

export default function GlobalModal() {
  const { modals } = useModal();

  useEffect(() => {
    if (modals?.length > 0) {
      document.body.style.overflow = 'hidden';

      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [modals]);

  return (
    <>
      {modals.map(({ Component, props }, idx) => {
        return <Component key={idx} {...props} />;
      })}
    </>
  );
}
