'use client';

import CRegionSetting from '@/components/c-region-setting';

interface OnNextSearchParams {
  onNextPage: 'home';
}

export default function SelectRestaurantRegionSetting({ searchParams }: { searchParams?: OnNextSearchParams }) {
  const onNextPage = searchParams?.onNextPage === 'home' ? '/home' : '/select-restaurant';

  return <CRegionSetting category="dining_area" onNextPage={onNextPage} />;
}
