'use client';

import CRegionSetting from '@/components/c-region-setting';
import { useSearchParams } from 'next/navigation';

export default function RegionSetting() {
  const params = useSearchParams();
  const category = params.get('category') as 'activity_area' | 'dining_area';

  return <CRegionSetting category={category} onNextPage={'/mypage'} />;
}
