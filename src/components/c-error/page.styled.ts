import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 60px;
  padding: 0 20px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 37px;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-bottom: 138px;
`;

export const Title = styled.div`
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  text-align: center;
`;

export const Desc = styled.p`
  padding: 0 20px;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%;
  color: ${({ theme }) => theme.colors.neutral.bg40};
  text-align: center;
  white-space: pre-line;
  word-break: keep-all;
`;

export const NextButtonWrapper = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.colors.white};
  width: 100%;
  padding: 0px 20px 40px;

  @media screen and (max-width: 768px) {
    position: fixed;
  }
`;
