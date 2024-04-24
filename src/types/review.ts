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

interface User {
  id: number;
  nickname: string;
  reviews: number;
}
