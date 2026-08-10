import { Region, isValidRegion } from '@/features/region/lib/region';
import useUser from '@/shared/hooks/useUser';

interface UseRegionResult extends Region {
  /** 계정에 지역이 설정되어 있는지 여부 */
  hasRegion: boolean;
}

/**
 * 지역 정보를 제공하는 훅.
 *
 * 지역의 단일 소스는 서버(`user.area`)다. 로컬 저장소에는 지역을 두지 않으므로
 * 비로그인 사용자에게는 지역이 없고, 지역이 필요한 화면은 로그인을 요구한다.
 */
export default function useRegion(): UseRegionResult {
  const { data } = useUser();

  const area = isValidRegion(data?.area) ? data?.area : undefined;

  return {
    address: area?.address ?? '',
    latitude: area?.latitude ?? 0,
    longitude: area?.longitude ?? 0,
    hasRegion: Boolean(area),
  };
}
