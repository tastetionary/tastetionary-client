import dynamic from 'next/dynamic';
import { ComponentProps, FunctionComponent, useEffect } from 'react';
import useModal from './hooks/useModal';

const ExampleModal = dynamic(() => import('../ExampleModal'), { ssr: false });
const DialogModal = dynamic(() => import('../DialogModal'), { ssr: false });
const LoadingModal = dynamic(() => import('../LoadingModal'), { ssr: false });

// 사용할 모달 컴포넌트들을 담은 Object
export const MODAL_TYPES = {
  example: ExampleModal as FunctionComponent<ComponentProps<typeof ExampleModal>>,
  dialog: DialogModal as FunctionComponent<ComponentProps<typeof DialogModal>>,
  loading: LoadingModal as FunctionComponent<ComponentProps<typeof LoadingModal>>,
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
