import styled from 'styled-components';

export const Button = styled.button<{ subject: 'menu' | 'restaurant' }>`
  width: 100%;
  box-shadow: 4px 4px 0px 0px rgba(0, 0, 0, 0.1);
  padding: 0px;
  background: repeating-linear-gradient(
    ${({ theme, subject }) =>
      subject === 'menu'
        ? `${theme.colors.secondary.o10}, ${theme.colors.secondary.o10} 20px, ${theme.colors.secondary.o05} 0, ${theme.colors.secondary.o05} 100%`
        : `${theme.colors.primary.y20}, ${theme.colors.primary.y20} 20px, ${theme.colors.primary.y05} 0, ${theme.colors.primary.y05} 100%`}
  );

  & button {
    background-image: ${({ subject }) =>
      subject === 'menu'
        ? `url('./image/PickerButton/menu_icon.svg')`
        : `url('./image/PickerButton/restaurant_icon.svg')`};
  }

  &:active {
    background: repeating-linear-gradient(
      ${({ theme, subject }) =>
        subject === 'menu'
          ? `${theme.colors.secondary.o40}, ${theme.colors.secondary.o40} 20px, ${theme.colors.secondary.o05} 0, ${theme.colors.secondary.o05} 100%`
          : `${theme.colors.primary.y40}, ${theme.colors.primary.y40} 20px, ${theme.colors.primary.y05} 0, ${theme.colors.primary.y05} 100%`}
    );

    & button {
      background-image: ${({ subject }) =>
        subject === 'menu'
          ? `url('./image/PickerButton/menu_pressed_icon.svg')`
          : `url('./image/PickerButton/restaurant_pressed_icon.svg')`};
    }
  }
`;
export const Header = styled.div`
  width: 100%;
  height: 20px;
`;
export const Content = styled.div`
  padding-top: 12px;
`;
export const Icon = styled.button`
  width: 72px;
  height: 72px;
`;
export const Title = styled.p`
  font-size: 20px;
  text-shadow:
    -2px 0 white,
    0 2px white,
    2px 0 white,
    0 -2px white;
  font-weight: 400;
`;
export const Description = styled.p<{ subject: 'menu' | 'restaurant' }>`
  color: ${({ subject, theme }) => (subject === 'menu' ? theme.colors.secondary.o30 : theme.colors.primary.y50)};
  padding: 19px 0px 17px 0px;
  font-size: 14px;
`;
