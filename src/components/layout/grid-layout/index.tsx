import { styled } from 'styled-components';

interface Props {
  children: React.ReactNode;
}
export default function GridLayout({ children }: Props) {
  return <S.Wrapper>{children}</S.Wrapper>;
}

const S = {
  Wrapper: styled.div`
    background-size:
      10px,
      10px,
      10px 10px,
      10px 10px;
    background-image: linear-gradient(90deg, #00000004 1px, transparent 1px),
      linear-gradient(90deg, #00000004 1px, transparent 1px), linear-gradient(#00000004 1px, transparent 1px),
      linear-gradient(#00000004 1px, transparent 1px);
    z-index: -100;
  `,
};
