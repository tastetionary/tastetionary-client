import styled from 'styled-components';

export const Form = styled.form`
  width: 100%;
  padding: 20px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.neutral.bg20};
  display: flex;
  gap: 20px;
  align-items: center;
`;

export const InputContainer = styled.div`
  width: calc(100% - 120px);
`;

export const SearchButton = styled.button`
  padding: 14px 30px;
  border: 2px solid ${({ theme }) => theme.colors.neutral.bg60};
  background: ${({ theme }) => theme.colors.primary.y70};
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%;
  color: ${({ theme }) => theme.colors.white};

  &:active {
    background-color: ${({ theme }) => theme.colors.primary.y90};
  }

  &:disabled {
    cursor: not-allowed;
    background-color: ${({ theme }) => theme.colors.primary.y10};
  }
`;

export const PlaceList = styled.ul`
  width: 100%;
`;

export const PlaceListItem = styled.div`
  width: 100%;
  padding: 10px 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral.bg40};
`;

export const PlaceContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const PlaceName = styled.div`
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 4px;
`;

export const PlaceAddress = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.neutral.bg60};
`;

export const SelectButton = styled.button`
  padding: 4px 8px;
  border: 1px solid ${({ theme }) => theme.colors.neutral.bg60};
  background-color: ${({ theme }) => theme.colors.primary.y70};
  color: ${({ theme }) => theme.colors.white};

  &:active {
    background-color: ${({ theme }) => theme.colors.primary.y90};
  }
`;

export const MapContainer = styled.div`
  max-width: 320px;
  width: 100%;
  height: 320px;
  margin-top: 20px;
`;
