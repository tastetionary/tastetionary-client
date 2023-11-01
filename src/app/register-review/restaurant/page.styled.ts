import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  padding: 20px;
`;

export const Title = styled.div`
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 30px */
  margin-bottom: 15px;
`;

export const SubTitle = styled.p`
  color: ${({ theme }) => theme.colors.neutral.bg40};
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 170%; /* 23.8px */
  margin-bottom: 37px;
`;
