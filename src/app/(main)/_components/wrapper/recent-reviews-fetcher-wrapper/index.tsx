import { homeRepository } from '@/apis/home';
import RecentReviews from '../../recent-reivews';

export default async function RecentReviewsFetcherWrapper() {
  const recentReviews = await homeRepository().getRecentReviews();
  return <RecentReviews reviews={recentReviews} />;
}
