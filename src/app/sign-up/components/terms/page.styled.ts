import { styled } from 'styled-components';

export const Wrapper = styled.div`
  padding: 20px;
`;

export const TitleContainer = styled.div``;

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

export const CheckboxWrapper = styled.div`
  margin-top: 37px;
  display: flex;
  height: 40px;
  box-shadow: 4px 4px 0px 0px rgba(0, 0, 0, 0.1);
`;

export const CheckboxContainer = styled.div`
  display: flex;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.neutral.bg05};
  align-items: center;
  padding-left: 10px;
`;

export const Divider = styled.div`
  width: 10px;
  background-color: ${({ theme }) => theme.colors.neutral.bg10};
`;
