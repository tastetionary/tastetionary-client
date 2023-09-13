import HEADER_LAYOUT_LOGO from '@/assets/logo/header_layout.svg';
import { styled } from 'styled-components';

interface Props {
  children: React.ReactNode;
}

export default function MobileLayout({ children }: Props) {
  return (
    <S.LayoutWrapper>
      <S.Layout>
        <S.LogoWrapper>
          <HEADER_LAYOUT_LOGO />
        </S.LogoWrapper>
        {children}
      </S.Layout>
    </S.LayoutWrapper>
  );
}

const S = {
  LayoutWrapper: styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: ${({ theme }) => theme.colors.neutral.bg05};
    min-height: 100vh;
  `,
  Layout: styled.div`
    max-width: 360px;
    margin: 0 auto;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.white};

    @media screen and (max-width: 768px) {
      max-width: 100%;
    }
  `,
  LogoWrapper: styled.div`
    position: fixed;
    top: 0;
    width: 360px;
    height: 44px;
    background-color: ${({ theme }) => theme.colors.neutral.bg10};
    z-index: 1;

    @media screen and (max-width: 768px) {
      width: 100%;
    }

    svg {
      width: 360px;

      @media screen and (max-width: 768px) {
        width: 100%;
      }
    }
  `,
};
