import * as S from './page.styled';

export interface BarGraphProps {
  $trackRank: 'smallest' | 'small' | 'medium' | 'large' | 'largest' | string;
  $trackWidth: number;
}

export default function CBarGraph({ $trackRank, $trackWidth }: BarGraphProps) {
  return (
    <S.BarRail>
      <S.BarTrack $trackRank={$trackRank} $trackWidth={$trackWidth} />
    </S.BarRail>
  );
}
