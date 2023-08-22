import loadable from '@loadable/component';
import { ComponentProps, FunctionComponent, useEffect } from 'react';
import useModal from './hooks/useModal';

const ExampleModal = loadable(() => import('../ExampleModal'), { ssr: false });

// 사용할 모달 컴포넌트들을 담은 Object
export const MODAL_TYPES = {
    example: ExampleModal as FunctionComponent<ComponentProps<typeof ExampleModal>>,
};

export default function GlobalModal() {
    const { modals } = useModal();

    useEffect(() => {
        if (modals?.length > 0) {
            document.body.style.cssText = `
      position: fixed;
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
            return () => {
                const scrollY = document.body.style.top;
                document.body.style.cssText = '';
                window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
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
