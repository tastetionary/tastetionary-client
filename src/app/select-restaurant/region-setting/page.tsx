'use client';

import CRegionSetting from '@/components/c-region-setting';

interface OnNextSearchParams {
  onNextPage: 'home';
}

export default async function SelectRestaurantRegionSetting({
  searchParams,
}: {
  searchParams?: Promise<OnNextSearchParams>;
}) {
  const resolvedSearchParams = await searchParams;
  const onNextPage = resolvedSearchParams?.onNextPage === 'home' ? '/' : '/select-restaurant';

  return <CRegionSetting category="dining_area" onNextPage={onNextPage} />;
}
