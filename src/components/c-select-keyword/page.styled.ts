import styled from 'styled-components';

// 다른 파일에서 참조하고 있어서 제거할 수 없음!
export const KeywordContainer = styled.div`
  margin-top: 24px;
  gap: 16px 8px;
  display: flex;
  flex-wrap: wrap;
`;
export const KeywordBtn = styled.button<{ $isSelected?: boolean }>`
  padding: 13px 16px;
  border: 2px solid
    ${({ theme, $isSelected }) => ($isSelected ? theme.colors.secondary.o70 : theme.colors.neutral.bg20)};
  background-color: ${({ theme, $isSelected }) => ($isSelected ? theme.colors.primary.y70 : theme.colors.white)};
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  color: ${({ $isSelected, theme }) => ($isSelected ? theme.colors.white : 'inherit')};
`;
