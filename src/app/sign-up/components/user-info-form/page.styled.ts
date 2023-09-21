import { styled } from 'styled-components';

export const Wrapper = styled.div`
  padding: 20px;
`;

export const Title = styled.p`
  font-size: 20px;
  font-weight: 700;
  line-height: 150%;
  color: ${({ theme }) => theme.colors.neutral.bg80};
`;

export const MainContainer = styled.div`
  margin-top: 30px;

  & > div {
    margin-top: 20px;
  }
`;

export const NextButtonWrapper = styled.div`
  margin-top: 142px;
`;
