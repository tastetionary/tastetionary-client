import styled from 'styled-components';

export const Section = styled.section`
  margin-top: 24px;
  width: 100%;
  padding: 0 16px;
`;

export const SectionTitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const SectionTitle = styled.div`
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
`;

export const SectionDesc = styled.span`
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.neutral.bg30};
`;

export const MenuContainer = styled.div`
  padding: 24px 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-row-gap: 24px;
  justify-items: center;
`;

export const MenuItem = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

export const MenuItemTitle = styled.span`
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  text-align: center;
`;

export const KeywordContainer = styled.div`
  margin-top: 24px;
  gap: 16px 8px;
  display: flex;
  flex-wrap: wrap;
`;

export const KeywordBtn = styled.button<{ $isSelected: boolean }>`
  padding: 16px;
  border: 2px solid
    ${({ theme, $isSelected }) => ($isSelected ? theme.colors.secondary.o70 : theme.colors.neutral.bg20)};
  background-color: ${({ theme, $isSelected }) => ($isSelected ? theme.colors.primary.y70 : theme.colors.white)};

  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  color: ${({ $isSelected, theme }) => ($isSelected ? theme.colors.white : 'inherit')};
`;

export const RefreshContainer = styled.div<{ disabled: boolean }>`
  cursor: ${({disabled}) => disabled ? "not-allowed" : "pointer"};
  max-width: 166px;
  margin: 24px auto 18px;
  padding: 12px 32px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  opacity: ${({ disabled }) => (disabled ? '0.4' : 1)};
`;

export const RefreshText = styled.span`
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
`;
