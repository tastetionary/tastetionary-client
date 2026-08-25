import RecommendMenu from '../../recommend-menu';
import { homeRepository } from '@/features/home/api';

export default async function RecommendMenuFetcherWrapper() {
  const recentPickedMenus = await homeRepository().getRecentPickedMenus();
  return <RecommendMenu menus={recentPickedMenus} />;
}
