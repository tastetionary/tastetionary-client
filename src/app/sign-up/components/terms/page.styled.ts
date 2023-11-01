import styled from 'styled-components';

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

export const CheckboxContainer = styled.div<{ isActive: boolean }>`
  display: flex;
  width: 100%;
  background-color: ${({ theme, isActive }) => (isActive ? theme.colors.primary.y05 : theme.colors.neutral.bg05)};
  align-items: center;
  padding-left: 10px;
`;

export const Divider = styled.div<{ isActive: boolean }>`
  width: 10px;
  background-color: ${({ theme, isActive }) => (isActive ? theme.colors.primary.y20 : theme.colors.neutral.bg10)};
`;

export const PrivacyNoticeWrapper = styled.div`
  display: flex;
  padding: 10px 16px;
  margin-top: 20px;
  align-items: center;
`;

export const PrivacyNoticeCheckboxContainer = styled.div``;

export const PrivacyNoticeContainer = styled.div`
  display: flex;
  width: 100%;
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.neutral.bg80};
  justify-content: space-between;
`;

export const PrivacyNoticeTitle = styled.p``;
export const PrivacyNoticeLook = styled.p`
  font-size: 12px;
  font-weight: 400;
  text-decoration-line: underline;
  color: ${({ theme }) => theme.colors.neutral.bg40};
`;

export const MarketingWrapper = styled.div`
  display: flex;
  padding: 10px 16px;
  align-items: center;
`;

export const MarketingCheckboxContainer = styled.div``;

export const MarketingContainer = styled.div`
  display: flex;
  width: 100%;
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.neutral.bg80};
  justify-content: space-between;
`;

export const MarketingTitle = styled.p``;
export const MarketingLook = styled.p`
  font-size: 12px;
  font-weight: 400;
  text-decoration-line: underline;
  color: ${({ theme }) => theme.colors.neutral.bg40};
`;

export const NextButtonWrapper = styled.div`
  margin-top: 122px;
`;
