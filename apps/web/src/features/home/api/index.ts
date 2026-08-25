import { Reviews } from '@/app/(main)/_components/review-content';
import http from '@/shared/api/http';

export interface PickedMenus {
  id: number;
  name: string;
}

export const homeRepository = () => {
  return {
    getRecentReviews: async (): Promise<Reviews[]> => {
      return await http.get('/apis/v1/restaurant/review/recent');
    },
    getRecentPickedMenus: async (): Promise<PickedMenus[]> => {
      return await http.get('/apis/v1/food/recent');
    },
  };
};
