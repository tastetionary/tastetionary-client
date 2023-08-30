'use client';

import HORIZONTAL_LOGO from '@/assets/logo/horizontal_logo.svg';
import VERTICAL_LOGO from '@/assets/logo/vertical_logo.svg';
import styled from 'styled-components';

export default function Home() {
    return (
        <Main>
            맛셔너리
            <VERTICAL_LOGO />
            <HORIZONTAL_LOGO width="107" height="20" />
        </Main>
    );
}

const Main = styled.div`
    background-color: ${({ theme }) => theme.colors.white};
    width: 100vw;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px;
    gap: 20px;
`;
