import HEADER_LAYOUT_LOGO from '@/assets/logo/header_layout.svg';
import { styled } from 'styled-components';

interface Props {
  children: React.ReactNode;
}

export default function MobileLayout({ children }: Props) {
  return (
    <S.Layout>
      <S.LogoWrapper>
        <HEADER_LAYOUT_LOGO />
      </S.LogoWrapper>
      {children}
    </S.Layout>
  );
}

const S = {
  Layout: styled.div`
    max-width: 360px;
    margin: 0 auto;
  `,
  LogoWrapper: styled.div`
    height: 44px;
    background-color: #cfd8db;
  `,
};
