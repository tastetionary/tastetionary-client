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
export const Description = styled.p`
  margin-top: 20px;
  font-size: 11px;
  font-weight: 400;
  line-height: 200%;
  color: ${({ theme }) => theme.colors.neutral.bg80};
`;
export const MainText = styled.p`
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.neutral.bg80};
`;
export const Text = styled.span`
  white-space: pre-wrap;
  font-size: 11px;
  font-weight: 400;
  line-height: 200%;
  color: ${({ theme }) => theme.colors.neutral.bg80};
`;
