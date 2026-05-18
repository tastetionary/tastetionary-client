import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 20px 20px 120px;
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
  position: absolute;
  left: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.colors.white};
  width: 100%;
  padding: 20px 20px 40px;

  @media screen and (max-width: 768px) {
    position: fixed;
  }
`;
