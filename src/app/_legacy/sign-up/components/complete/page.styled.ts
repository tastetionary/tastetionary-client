import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 80px 0 120px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 100%;
  position: relative;
`;

export const Box = styled.div`
  width: 120px;
  height: 120px;
  background-color: #d9d9d9;
`;

export const Title = styled.div`
  margin-top: 20px;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
`;

export const SubTitle = styled.p`
  margin: 15px 0 100px 0;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 170%;
  color: ${({ theme }) => theme.colors.neutral.bg40};
`;

export const NextButtonWrapper = styled.div`
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
