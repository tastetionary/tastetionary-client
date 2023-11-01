import { KeywordContainer } from '@/components/c-select-keyword/page.styled';
import styled from 'styled-components';

export const ResultContainer = styled.div`
  width: 100%;
  padding: 20px 20px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ResultLabel = styled.p`
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 142.857% */
`;

export const ResultValue = styled.strong`
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary.y70};
`;

export const AddressContainer = styled.div`
  width: 100%;
  padding: 13px 20px;
  background-color: ${({ theme }) => theme.colors.primary.y05};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const MapText = styled.span`
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
`;

export const AddressText = styled(MapText)`
  color: ${({ theme }) => theme.colors.primary.y80};
  width: 220px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ImageContainer = styled.div`
  width: 100%;
  padding: 20px;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr 1fr;
`;

export const ImageItem = styled.div<{ $bgUrl: string }>`
  width: 100%;
  height: 120px;
  background-image: url(${({ $bgUrl }) => $bgUrl});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  &:first-child {
    grid-column: 1 / 3;
    height: 240px;
  }
`;

export const PriceGraphContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const PriceGraphItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 25px;
`;

export const PriceGraphLabel = styled.label`
  min-width: 60px;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.neutral.bg40};
`;

export const ReviewContainer = styled(AddressContainer)`
  padding: 14px 20px;
  background-color: ${({ theme }) => theme.colors.neutral.bg05};
  margin-bottom: 20px;
`;

export const ReviewKeywordContainer = styled(KeywordContainer)`
  margin-top: 10px;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ButtonDivider = styled.div`
  width: 1px;
  height: 10px;
  background-color: ${({ theme }) => theme.colors.neutral.bg20};
  margin: 0 5px;
`;

export const FlexBox = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;
