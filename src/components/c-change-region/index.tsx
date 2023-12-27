import IC_MAP from '@/assets/common/map.svg';
import useUser from '@/hooks/useUser';
import { useRouter } from 'next/navigation';
import * as S from './page.styled';

interface Props {
  type: 'activity_area' | 'dining_area';
}

export default function CChangeRegion({ type }: Props) {
  const router = useRouter();
  const { data } = useUser();

  const onClickEvent = () => {
    if (type === 'dining_area') {
      router.push('/select-restaurant/region-setting');
    } else {
      router.push('/register-review/region-setting');
    }
  };

  return (
    <S.ChangeRegionContainer onClick={onClickEvent}>
      <S.FlexBox>
        <IC_MAP width={24} height={24} />

        <S.Region>
          {type === 'dining_area'
            ? data?.area?.diningArea?.address
            : type === 'activity_area'
            ? data?.area?.activityArea?.address
            : ''}
        </S.Region>
      </S.FlexBox>

      <S.ChangeText>{type === 'dining_area' ? '식사' : '활동'} 지역 변경 &gt;</S.ChangeText>
    </S.ChangeRegionContainer>
  );
}
