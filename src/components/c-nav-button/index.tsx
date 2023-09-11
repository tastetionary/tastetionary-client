import { styled } from 'styled-components';

interface Props {
  title: string;
  icon: React.ReactElement;
}

export default function CNavButton({ title, icon }: Props) {
  return (
    <>
      <S.Button>
        <S.Icon>{icon}</S.Icon>
        <S.Title>{title}</S.Title>
      </S.Button>
    </>
  );
}

const S = {
  Button: styled.button`
    width: 120px;
    height: 60px;
    background-color: ${({ theme }) => theme.colors.neutral.bg05};
    border: 1px solid #ced9db;
  `,
  Icon: styled.div``,
  Title: styled.p`
    font-size: 14px;
  `,
};
