import MenuIcon from '@/assets/logo/menu_icon.svg';
import RestaurantIcon from '@/assets/logo/restaurant_icon.svg';
import { styled } from 'styled-components';
import HorizontalLayout from '../layout/horizontal-layout';

interface Props {
  title: string;
  desc: string;
  subject: 'menu' | 'restaurant';
}

export default function CPickerButton({ title, desc, subject }: Props) {
  return (
    <>
      <S.Button subject={subject}>
        <HorizontalLayout subject={subject}>
          <S.Header></S.Header>
          <S.Content>
            <S.Icon>
              {subject === 'menu' && <MenuIcon />}
              {subject === 'restaurant' && <RestaurantIcon />}
            </S.Icon>
            <S.Title>{title}</S.Title>
            <S.Description subject={subject}>{desc}</S.Description>
          </S.Content>
        </HorizontalLayout>
      </S.Button>
    </>
  );
}

const S = {
  Button: styled.button<{ subject: 'menu' | 'restaurant' }>`
    width: 280px;
    box-shadow: 4px 4px 0px 0px rgba(0, 0, 0, 0.1);
    padding: 0px 0px;
    background: repeating-linear-gradient(
      ${({ theme, subject }) =>
        subject === 'menu'
          ? `${theme.colors.secondary.o10}, ${theme.colors.secondary.o10} 20px, ${theme.colors.secondary.o05} 0, ${theme.colors.secondary.o05} 100%`
          : `${theme.colors.primary.y20}, ${theme.colors.primary.y20} 20px, ${theme.colors.primary.y05} 0, ${theme.colors.primary.y05} 100%`}
    );
  `,
  Header: styled.div`
    width: 280px;
    height: 20px;
  `,
  Content: styled.div``,
  Icon: styled.div``,
  Title: styled.p`
    font-size: 20px;
  `,
  Description: styled.p<{ subject: 'menu' | 'restaurant' }>`
    color: ${({ subject, theme }) => (subject === 'menu' ? theme.colors.secondary.o30 : theme.colors.primary.y50)};
    padding: 19px 0px 17px 0px;
    font-size: 14px;
  `,
};
