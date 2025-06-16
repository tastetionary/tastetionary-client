import { homeRepository } from '@/apis/home';
import CServerHeaderWithChildren from '@/components/c-server-header-with-children';
import BannerSlider from './_components/banner-swiper';
import FooterLinks from './_components/footer-links';
import LocationSection from './_components/location-section';
import MenuSelection from './_components/menu-selection';
import RecentReviews from './_components/recent-reivews';
import RecommendMenu from './_components/recommend-menu';

// 동적 렌더링 강제 (캐싱 비활성화)
export const dynamic = 'force-dynamic';

export default async function Home() {
  const recentReviews = await homeRepository().getRecentReviews();
  const recentPickedMenus = await homeRepository().getRecentPickedMenus();

  return (
    <CServerHeaderWithChildren title="맛셔너리" isHome isLogo>
      <LocationSection />

      <MenuSelection />

      <BannerSlider />

      <RecentReviews reviews={recentReviews} />

      <RecommendMenu menus={recentPickedMenus} />

      <footer>
        <FooterLinks />
      </footer>
    </CServerHeaderWithChildren>
  );
}
