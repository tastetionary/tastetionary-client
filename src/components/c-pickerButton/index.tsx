import MenuIcon from '@/assets/logo/menu_icon.svg';
import { styled } from 'styled-components';

interface Props {
  title: string;
  desc: string;
  subject: 'menu' | 'restaurant';
}

export default function CPickerButton({ title, desc, subject }: Props) {
  return (
    <>
      <S.Button>
        <S.Header></S.Header>
        <S.Content>
          <S.Icon>{subject === 'menu' && <MenuIcon />}</S.Icon>
          <S.Title>{title}</S.Title>
          <S.Description subject={subject}>{desc}</S.Description>
        </S.Content>
      </S.Button>
    </>
  );
}

const S = {
  Button: styled.button`
    width: 280px;
    box-shadow: 4px 4px 0px 0px rgba(0, 0, 0, 0.1);
    padding: 0px 0px;
  `,
  Header: styled.div`
    width: 280px;
    height: 20px;
    background-color: ${props => props.theme.colors.secondary.o10};
  `,
  Content: styled.div`
    background-color: ${props => props.theme.colors.secondary.o05};
  `,
  Icon: styled.div``,
  Title: styled.p``,
  Description: styled.p<{ subject: string }>`
    color: ${({ subject, theme }) => (subject === 'menu' ? theme.colors.secondary.o30 : theme.colors.primary.y50)};
    padding: 15px 0px 17px 0px;
  `,
};
