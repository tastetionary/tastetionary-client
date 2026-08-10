import CRegionSetting from '@/features/region/components/c-region-setting';

// 로그인 게이트는 src/middleware.ts 에서 처리한다.
export default function SelectRestaurantRegionSetting() {
  return <CRegionSetting category="dining_area" onNextPage="/explore" />;
}
