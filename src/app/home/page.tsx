import { homeRepository } from '@/apis/home';
import CServerHeaderWithChildren from '@/components/c-server-header-with-children';
import FooterLinks from './_components/footer-links';
import LocationSection from './_components/location-section';
import MenuSelection from './_components/menu-selection';
import RecentReviews from './_components/recent-reivews';
import RecommendMenu from './_components/recommend-menu';

export default async function Home() {
  const recentReviews = await homeRepository().getRecentReviews();
  console.log('recentReviews', recentReviews);

  return (
    <CServerHeaderWithChildren title="맛셔너리" isHome isLogo>
      <LocationSection />

      <MenuSelection />

      <div className="h-[500px] w-full bg-neutral-bg05"></div>

      <RecentReviews reviews={recentReviews} />

      <RecommendMenu />

      <footer>
        <FooterLinks />
      </footer>
    </CServerHeaderWithChildren>
  );
}
