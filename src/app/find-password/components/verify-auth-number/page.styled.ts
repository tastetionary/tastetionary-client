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

export const Form = styled.form``;

export const SubButtonContainer = styled.div`
  margin: 0 auto 22px;
  padding: 14px 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  span {
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.neutral.bg40};
  }
`;

export const SubButton = styled.button`
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  text-decoration: underline;
  padding: unset;
`;
