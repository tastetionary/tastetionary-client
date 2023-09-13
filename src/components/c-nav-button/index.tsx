import { styled } from 'styled-components';

interface Props {
  title: string;
  icon: React.ReactElement;
  isActive: Boolean;
}

export default function CNavButton({ title, icon, isActive }: Props) {
  return (
    <>
      <S.Button isActive={isActive}>
        <S.Icon>{icon}</S.Icon>
        <S.Title>{title}</S.Title>
      </S.Button>
    </>
  );
}

const S = {
  Button: styled.button<{ isActive: Boolean }>`
    width: 120px;
    height: 60px;
    background-color: ${({ theme, isActive }) => (isActive ? 'white' : theme.colors.neutral.bg05)};
    border: 1px solid #ced9db;
  `,
  Icon: styled.div``,
  Title: styled.p`
    font-size: 14px;
  `,
};
