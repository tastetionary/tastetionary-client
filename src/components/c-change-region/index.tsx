import IC_MAP from '@/assets/common/map.svg';
import * as S from './page.styled';

interface Props {
  type: 'activity_area' | 'dining_area';
  region: string;
}

export default function CChangeRegion({ type, region }: Props) {
  return (
    <S.ChangeRegionContainer>
      <S.FlexBox>
        <IC_MAP width={24} height={24} />

        <S.Region>{region}</S.Region>
      </S.FlexBox>

      <S.ChangeText>{type === 'dining_area' ? '식사' : '활동'} 지역 변경 &gt;</S.ChangeText>
    </S.ChangeRegionContainer>
  );
}
