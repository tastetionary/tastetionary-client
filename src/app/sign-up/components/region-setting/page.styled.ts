import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 20px 20px 120px;
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
`;

export const Title = styled.div`
  margin-top: 20px;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  white-space: pre-wrap;
`;

export const SubTitle = styled.p`
  margin-top: 15px;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 170%;
  color: ${({ theme }) => theme.colors.neutral.bg40};
`;

export const Form = styled.div`
  margin-top: 37px;
  width: 100%;
`;

export const InputContainer = styled.div`
  margin-bottom: 115px;
  width: 100%;

  div:first-child {
    margin-bottom: 20px;
  }
`;

export const PostCodeContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const MapContainer = styled.div`
  max-width: 320px;
  width: 100%;
  height: 320px;
  margin-top: 20px;

  @media screen and (max-width: 768px) {
    max-width: 100%;
  }
`;

export const ButtonContainer = styled.div`
  margin-top: 44px;
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
