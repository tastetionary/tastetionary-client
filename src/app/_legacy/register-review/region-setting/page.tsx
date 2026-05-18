'use client';

import CRegionSetting from '@/components/c-region-setting';

export default function RegisterReviewRegionSetting() {
  return <CRegionSetting category="activity_area" onNextPage={'/register-review/restaurant'} />;
}
