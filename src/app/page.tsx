'use client';

import { MODAL_TYPES } from '@/components/Modal/GlobalModal';
import useModal from '@/components/Modal/GlobalModal/hooks/useModal';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

export default function Home() {
    const router = useRouter();
    const { openModal, closeModal } = useModal();

    const testModal = () => {
        openModal(MODAL_TYPES.example, {
            title: '테스트 모달입니다.',
            message: 'test test test',
            cancelText: '취소',
            confirmText: 'example',
            handleClose: () => closeModal(MODAL_TYPES.example),
            handleConfirm: () => {
                router.push('/example');
                closeModal(MODAL_TYPES.example);
            },
        });
    };

    return (
        <Main>
            <div>hello</div>
            <button onClick={testModal}>모달 테스트 버튼</button>
        </Main>
    );
}

const Main = styled.div`
    background-color: #d0dbf2;
    width: 100vw;
    min-height: 100vh;
`;
