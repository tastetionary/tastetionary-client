import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  padding: 24px;
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  flex-direction: column;
  gap: 12px;

  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.neutral.bg10};
  }
`;

export const SpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Nickname = styled.span`
  font-size: 14px;
  line-height: 14px;
  font-weight: 700;
`;

export const Date = styled.span`
  font-size: 12px;
  line-height: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.neutral.bg20};
`;

export const Review = styled.p`
  font-size: 14px;
  line-height: 25.2px;
`;

export const KeywordContainer = styled.div`
  display: flex;
  gap: 4px;
`;

export const Keyword = styled.div`
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.colors.neutral.bg20};

  font-size: 12px;
  line-height: 12px;
  color: ${({ theme }) => theme.colors.neutral.bg60};
`;

export const LikedBtnContainer = styled.div`
  display: flex;
  gap: 4px;
`;
