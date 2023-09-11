import { styled } from 'styled-components';

interface Props {
  children: React.ReactNode;
}
export default function GridLayout({ children }: Props) {
  return <S.Wrapper>{children}</S.Wrapper>;
}

const S = {
  Wrapper: styled.div`
    background-size: 20px 20px;
    background-image: ${({ theme }) => `linear-gradient(to right, ${theme.colors.neutral.bg05} 1px, transparent 1px),
      linear-gradient(to bottom, ${theme.colors.neutral.bg05} 1px, transparent 1px);`};
  `,
};
