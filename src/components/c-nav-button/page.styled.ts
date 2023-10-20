import styled from 'styled-components';

export const Button = styled.button<{ isActive: Boolean }>`
  width: 120px;
  height: 60px;
  background-color: ${({ theme, isActive }) => (isActive ? 'white' : theme.colors.neutral.bg05)};
  border: 1px solid #ced9db;
`;
export const Icon = styled.div``;

export const Title = styled.p`
  font-size: 14px;
`;
