import styled from 'styled-components';

export const Section = styled.section`
  width: 100%;
  padding: 0 16px;
  margin-bottom: 48px;

  &:first-child {
    margin-top: 20px;
  }
`;

export const SectionTitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
`;

export const SectionTitle = styled.div`
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
`;

export const SectionSubTitle = styled.span`
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.neutral.bg30};
`;
