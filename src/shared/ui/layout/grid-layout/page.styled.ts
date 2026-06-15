import styled from 'styled-components';

export const Wrapper = styled.div`
  padding-top: 100px;
  height: 100%;
  background-size: 20px 20px;
  background-image: ${({ theme }) => `linear-gradient(to right, ${theme.colors.neutral.bg05} 1px, transparent 1px),
      linear-gradient(to bottom, ${theme.colors.neutral.bg05} 1px, transparent 1px);`};
`;
