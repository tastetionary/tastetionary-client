import http from '@/shared/api/http';
import { RestaurantCategory } from '@/shared/types/enums';

interface Req {
  excludeIds: number[];
  category: RestaurantCategory[];
  keywords: string[];
  prices: string[];
  latitude?: number;
  longitude?: number;
}

export interface RestaurantReview {
  id: string;
  external_restaurant_information_id: string;
  user: {
    id: number;
    nickname: string;
    reviews: number;
  };
  reviewReactionCnt: {
    L: number;
    D: number;
  };
  userReaction: 'L' | 'D' | null;
  keywords: string[];
  summary: string;
  prices: string[];
  createdAt: string;
  updatedAt: string;
  opinion: 'L' | 'D';
}

export interface RestaurantRecommendRes {
  id: string;
  name: string;
  referenceLink: string;
  latitude: number;
  longitude: number;
  distance: number;
  reviews: RestaurantReview[];
  bookmark: boolean;
  aggregateReviews?: {
    categories: string[];
    summaries: string[];
    opinions: string;
    keywords: string[];
    prices: number[];
    aggregatePrice: {
      avg: number;
      [key: string]: number;
    };
    revisitRatio: number;
    totalCount: number;
  };
}

export const postRestaurantRecommend = async (req: Req, token?: string) => {
  return await http.post<RestaurantRecommendRes, Req>(
    '/apis/v1/restaurant/recommendation',
    req,
    token
      ? {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      : undefined
  );
};
