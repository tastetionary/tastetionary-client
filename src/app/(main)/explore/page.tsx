import { ErrorBoundary } from 'react-error-boundary';
import BannerSlider from '../_components/banner-swiper';
import ErrorFallback from '../_components/error-fallback';
import FooterLinks from '../_components/footer-links';
import LocationSection from '../_components/location-section';
import MenuSelection from '../_components/menu-selection';
import RecommendMenuFetcherWrapper from '../_components/wrapper/recommend-menu-fetcher-wrapper';
import CServerHeaderWithChildren from '@/shared/ui/c-server-header-with-children';

// 동적 렌더링 강제 (캐싱 비활성화)
export const dynamic = 'force-dynamic';

export default async function Home() {
  return (
    <CServerHeaderWithChildren title="맛셔너리" isHome isLogo>
      <LocationSection />

      <MenuSelection />

      <BannerSlider />

      <ErrorBoundary FallbackComponent={ErrorFallback}>
        {/* <RecentReviewsFetcherWrapper /> */}
        <RecommendMenuFetcherWrapper />
      </ErrorBoundary>

      {/* 로그인 기능 - 임시 비활성화 (푸터: 서비스 이용약관, 개인정보처리방침) */}
      <footer>
        <FooterLinks />
      </footer>
    </CServerHeaderWithChildren>
  );
}
