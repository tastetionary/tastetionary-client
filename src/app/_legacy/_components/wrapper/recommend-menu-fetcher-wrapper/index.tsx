import { homeRepository } from '@/apis/home';
import RecommendMenu from '../../recommend-menu';

export default async function RecommendMenuFetcherWrapper() {
  const recentPickedMenus = await homeRepository().getRecentPickedMenus();
  return <RecommendMenu menus={recentPickedMenus} />;
}
