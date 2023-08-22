import { ComponentProps, FunctionComponent, useCallback } from 'react';
import { atom, useRecoilState } from 'recoil';

export const modalsAtom = atom<
    Array<{
        Component: FunctionComponent<any>;
        props: ComponentProps<FunctionComponent<any>>;
    }>
>({
    key: `modalsAtom`,
    default: [],
});

export default function useModal() {
    const [modals, setModals] = useRecoilState(modalsAtom);

    const openModal = useCallback(
        <T extends FunctionComponent<any>>(Component: T, props: Omit<ComponentProps<T>, 'open'>) => {
            setModals(modals => [...modals, { Component, props: { ...props, open: true } }]);
        },
        [setModals]
    );

    const closeModal = useCallback(
        <T extends FunctionComponent<any>>(Component: T) => {
            setTimeout(() => {
                setModals(modals => modals.filter(modal => modal.Component !== Component));
            }, 150);
        },
        [setModals]
    );

    return {
        modals,
        openModal,
        closeModal,
    };
}
