import { Reviews } from '@/app/home/_components/review-content';
import http from '../http';

export const homeRepository = () => {
  return {
    getRecentReviews: async (): Promise<Reviews[]> => {
      return await http.get('/apis/v1/restaurant/review/recent');
    },
  };
};
