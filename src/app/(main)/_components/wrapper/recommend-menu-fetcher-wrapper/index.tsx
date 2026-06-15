import RecommendMenu from '../../recommend-menu';
import { homeRepository } from '@/apis/home';

export default async function RecommendMenuFetcherWrapper() {
  const recentPickedMenus = await homeRepository().getRecentPickedMenus();
  return <RecommendMenu menus={recentPickedMenus} />;
}
