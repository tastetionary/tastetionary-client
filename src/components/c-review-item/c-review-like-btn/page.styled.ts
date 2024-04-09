import styled from 'styled-components';

export const LikedBtn = styled.button<{ $clicked?: boolean }>`
  width: 100%;
  padding: 10px;
  border: 1px solid ${({ theme, $clicked }) => ($clicked ? theme.colors.secondary.o30 : theme.colors.neutral.bg80)};
  background-color: ${({ theme, $clicked }) => ($clicked ? theme.colors.secondary.o05 : theme.colors.white)};
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    font-size: 12px;
    line-height: 12px;
    color: ${({ theme, $clicked }) => ($clicked ? theme.colors.secondary.o50 : theme.colors.neutral.bg80)};
  }
`;
