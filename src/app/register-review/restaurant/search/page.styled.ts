import styled from 'styled-components';

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
    border-color: ${({ theme }) => theme.colors.neutral.bg20};
    background-color: ${({ theme }) => theme.colors.primary.y10};
  }
`;

export const PlaceList = styled.ul`
  width: 100%;
`;

export const PlaceContainer = styled.div`
  cursor: pointer;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const FlexBox = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const PlaceName = styled.div`
  font-size: 14px;
  font-weight: 700;
  line-height: 160%;
  font-family: var(--Pretendard-Variable) !important;
`;

export const Distance = styled.span`
  color: ${({ theme }) => theme.colors.secondary.o50};
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  font-family: var(--Pretendard-Variable) !important;
`;

export const PlaceAddress = styled.span`
  margin-top: 6px;
  display: block;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%;
  font-family: var(--Pretendard-Variable) !important;
`;

export const RoadAddressFlexBox = styled.div`
  margin-top: 2px;
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const RoadAddress = styled(PlaceAddress)`
  margin-top: 0px;
  color: ${({ theme }) => theme.colors.neutral.bg40};
`;

export const RoadAddressTag = styled.div`
  padding: 3px 4px;
  border-radius: 2px;
  background-color: ${({ theme }) => theme.colors.neutral.bg20};
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.white};
  font-family: var(--Pretendard-Variable) !important;
`;

export const Phone = styled(RoadAddress)`
  color: ${({ theme }) => theme.colors.primary.y90};
`;

export const SelectButton = styled.button`
  padding: 10px;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;

  &:active {
    text-decoration: underline;
  }
`;

export const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 20px;
`;
