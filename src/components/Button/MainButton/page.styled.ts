import styled from 'styled-components';

export const Button = styled.button`
  max-width: 360px;
  width: 100%;
  aspect-ratio: 4;
  background: url('./image/Button/Main_Button_default.svg') center no-repeat;
  background-size: cover;
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
    background-image: url('./image/Button/Main_Button_disabled.svg');
  }

  &:enabled:active {
    background-image: url('./image/Button/Main_Button_pressed.svg');
  }
`;
