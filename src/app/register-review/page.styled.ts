import styled from 'styled-components';

export const TitleSection = styled.section`
  width: 100%;
  padding: 20px 20px 4px;
`;

export const RestaurantName = styled.div`
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 36px;
`;

export const AddressSection = styled.section`
  width: 100%;
  padding: 13px 20px;
  background-color: ${({ theme }) => theme.colors.neutral.bg05};
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const Address = styled.span`
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 120%; /* 14.4px */
  color: ${({ theme }) => theme.colors.neutral.bg40};
`;

export const Form = styled.form`
  width: 100%;
`;

export const Byte = styled.div`
  width: 100%;
  margin-top: 10px;
  text-align: right;
  color: ${({ theme }) => theme.colors.neutral.bg40};
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%; /* 12px */
`;

export const SelectButtonContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const SelectButton = styled.button<{ $isSelected: boolean }>`
  padding: 16px;
  border: 2px solid
    ${({ $isSelected, theme }) => ($isSelected ? theme.colors.secondary.o50 : theme.colors.neutral.bg20)};
  background-color: ${({ $isSelected, theme }) => ($isSelected ? theme.colors.primary.y70 : theme.colors.white)};
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  color: ${({ $isSelected, theme }) => ($isSelected ? theme.colors.white : theme.colors.neutral.bg80)};
`;

export const ButtonContainer = styled.div`
  width: 100%;
  margin-bottom: 96px;
`;
