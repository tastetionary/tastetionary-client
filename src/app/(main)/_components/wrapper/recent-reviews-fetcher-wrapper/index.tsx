import RecentReviews from '../../recent-reivews';
import { homeRepository } from '@/features/home/api';

export default async function RecentReviewsFetcherWrapper() {
  const recentReviews = await homeRepository().getRecentReviews();
  return <RecentReviews reviews={recentReviews} />;
}
