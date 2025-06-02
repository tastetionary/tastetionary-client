import { Reviews } from '@/app/_components/review-content';
import http from '../http';

export interface RecentPickedMenu {
  id: number;
  name: string;
}

export const homeRepository = () => {
  return {
    getRecentReviews: async (): Promise<Reviews[]> => {
      return await http.get('/apis/v1/restaurant/review/recent');
    },
    getRecentPickedMenu: async (): Promise<RecentPickedMenu[]> => {
      return await http.get('/apis/v1/food/recent');
    },
  };
};
