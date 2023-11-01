import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 20px;
`;

export const Title = styled.p`
  font-size: 20px;
  font-weight: 700;
  line-height: 150%;
  color: ${({ theme }) => theme.colors.neutral.bg80};
`;

export const SubTitle = styled.p`
  margin-top: 14px;
  font-size: 14px;
  font-weight: 400;
  line-height: 170%;
  color: ${({ theme }) => theme.colors.neutral.bg40};
`;

export const NextButtonWrapper = styled.div`
  margin-top: 202px;
`;

export const MainContainer = styled.div`
  margin-top: 37px;
`;
