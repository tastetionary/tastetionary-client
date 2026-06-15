'use client';

import { useSearchParams } from 'next/navigation';
import CRegionSetting from '@/features/region/components/c-region-setting';

export default function RegionSetting() {
  const params = useSearchParams();
  const category = params.get('category') as 'activity_area' | 'dining_area';

  return <CRegionSetting category={category} onNextPage={'/mypage'} />;
}
