export interface GetRestaurantReviewRes {
  createdAt: string;
  updatedAt: string;
  id: string;
  external_restaurant_information_id: string;
  user: User;
  opinion: string;
  keywords: string[];
  summary: string;
  like: number;
  dislike: number;
}

export interface GetRestaurantKeywordReviewRes {
  revisitRatio: number;
  total: number;
  keywordCounts: {
    name: string;
    count: number;
  }[];
}

interface User {
  id: number;
  nickname: string;
  reviews: number;
}
