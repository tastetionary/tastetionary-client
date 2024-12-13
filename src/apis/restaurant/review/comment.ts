import http from '@/apis/http';
import { parseCookies } from 'nookies';

interface GetCommentParams {
  restaurantId: string;
}

interface PostReportParams {
  reviewId: number;
  content: string;
  category: string;
}

const token = parseCookies().token;

const reviewRepository = () => {
  return {
    getComment: async ({ restaurantId }: GetCommentParams) =>
      await http.get(`/apis/v1/restaurant/${restaurantId}/review`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    postReport: async ({ reviewId, content, category }: PostReportParams) =>
      await http.post(
        `/apis/v1/restaurant/review/report`,
        { reviewId, content, category },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ),
  };
};

export default reviewRepository;
