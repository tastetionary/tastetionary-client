import styled from 'styled-components';
import { BarGraphProps } from '.';

export const BarRail = styled.div`
  position: relative;
  width: 100%;
  height: 10px;
  background-color: ${({ theme }) => theme.colors.neutral.bg05};
  border: 1px solid ${({ theme }) => theme.colors.neutral.bg10};
`;

export const BarTrack = styled.div<BarGraphProps>`
  position: absolute;
  width: ${({ $trackWidth }) => $trackWidth ?? 0}%;
  height: 100%;
  left: 0px;
  top: 0px;
  background-color: ${({ theme, $trackRank }) =>
    $trackRank === 'smallest'
      ? theme.colors.primary.y05
      : $trackRank === 'small'
      ? theme.colors.primary.y10
      : $trackRank === 'medium'
      ? theme.colors.primary.y30
      : $trackRank === 'large'
      ? theme.colors.primary.y50
      : $trackRank === 'largest'
      ? theme.colors.primary.y70
      : theme.colors.neutral.bg05};
  outline: 1px solid
    ${({ theme, $trackRank }) =>
      $trackRank === 'smallest'
        ? theme.colors.primary.y20
        : $trackRank === 'small'
        ? theme.colors.primary.y30
        : $trackRank === 'medium'
        ? theme.colors.primary.y50
        : $trackRank === 'large'
        ? theme.colors.primary.y70
        : $trackRank === 'largest'
        ? theme.colors.secondary.o50
        : theme.colors.neutral.bg10};
`;
