import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const BannedList = styled.ul`
  width: 100%;

  li {
    list-style: disc;
    list-style-position: inside;
    text-indent: -16px;
    padding-left: 16px;
  }
`;

export const Content = styled.p`
  color: ${({ theme }) => theme.colors.neutral.bg60};
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%;

  span {
    text-decoration: underline;
    color: ${({ theme }) => theme.colors.secondary.o50};
  }
`;
