import styled from 'styled-components';

export const Button = styled.button`
  width: 100%;
  height: 56px;
  background: url(/image/Button/Main_Button_default.svg) center no-repeat;
  background-size: contain;
  display: flex;
  align-items: center;
  justify-content: center;

  color: ${({ theme }) => theme.colors.white};
  text-shadow: 0 1px ${({ theme }) => theme.colors.secondary.o50};
  font-size: 18px;
  font-style: normal;
  font-weight: 400;

  &:disabled {
    color: ${({ theme }) => theme.colors.primary.y30};
    text-shadow: none;
    background-image: url('/image/Button/Main_Button_disabled.svg');
  }

  &:enabled:active {
    background-image: url('/image/Button/Main_Button_pressed.svg');
  }
`;
