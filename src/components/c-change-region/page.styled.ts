import styled from 'styled-components';

export const ChangeRegionContainer = styled.div`
  cursor: pointer;
  width: 100%;
  padding: 8px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.neutral.bg05};

  &:active {
    background-color: ${({ theme }) => theme.colors.neutral.bg10};
  }
`;

export const FlexBox = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const Region = styled.span`
  margin-left: 4px;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
`;

export const ChangeText = styled(Region)`
  margin-left: 0;
  color: ${({ theme }) => theme.colors.neutral.bg40};
`;
