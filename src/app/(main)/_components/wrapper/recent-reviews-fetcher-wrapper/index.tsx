import RecentReviews from '../../recent-reivews';
import { homeRepository } from '@/apis/home';

export default async function RecentReviewsFetcherWrapper() {
  const recentReviews = await homeRepository().getRecentReviews();
  return <RecentReviews reviews={recentReviews} />;
}
