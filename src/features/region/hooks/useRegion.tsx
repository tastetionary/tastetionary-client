import { Region, useRegionStore } from '@/features/region/store/useRegionStore';
import useUser from '@/shared/hooks/useUser';

interface UseRegionResult extends Region {
  /** 로그인 사용자의 서버 지역 또는 localStorage 지역이 설정되어 있는지 여부 */
  hasRegion: boolean;
  setRegion: (value: Region) => void;
  clearRegion: () => void;
}

/**
 * 지역 정보를 통합 제공하는 훅.
 * - 로그인 사용자는 서버에 저장된 지역(`user.area`)을 우선 사용한다.
 * - 비로그인 사용자는 localStorage에 저장된 지역을 사용한다.
 * - `setRegion`은 항상 localStorage에 반영한다.
 */
export default function useRegion(): UseRegionResult {
  const { data } = useUser();
  const { region, setRegion, clearRegion } = useRegionStore();

  const userArea = data?.area?.address ? data.area : undefined;

  const address = userArea?.address ?? region.address;
  const latitude = userArea?.latitude ?? region.latitude;
  const longitude = userArea?.longitude ?? region.longitude;

  return {
    address,
    latitude,
    longitude,
    hasRegion: Boolean(address),
    setRegion,
    clearRegion,
  };
}
