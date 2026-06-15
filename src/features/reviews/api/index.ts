import http from '@/shared/api/http';
import { RestaurantCategory, RestaurantKeyword } from '@/shared/types/enums';

interface PostRestaurantReviewReq {
  token?: string;
  review: {
    category: RestaurantCategory;
    keywords: RestaurantKeyword[];
    prices: string[];
    summary: string;
    opinion: string;
  };
  external: {
    externalUUID: number;
    name: string;
    latitude: number;
    longitude: number;
    address: string;
    referenceLink?: string;
  };
}

export type RestaurantReviewItemType = {
  createdAt: string;
  external_restaurant_information_id: string;
  id: string;
  keywords: RestaurantKeyword[];
  opinion: 'Y' | 'N' | null;
  prices:
    | '10,000원 미만'
    | '10,000원 이상 ~ 13,000원 미만'
    | '13,000원 이상 ~ 16,000원 미만'
    | '16,000원 이상 ~ 20,000원 미만'
    | '20,000원 이상';
  restaurant: {
    address: string;
    id: string;
    name: string;
  };
  reviewReactionCnt: { L: number; D: number };
  summary: string;
  updatedAt: string;
  userReaction: null;
};

type DeleteRestaurantReviewType = {
  reviewId: string;
  token?: string;
};

type UpdateRestaurantReviewType = {
  reviewId: string;
  token?: string;
  category: RestaurantCategory;
  keywords: RestaurantKeyword[];
  prices: string[];
  summary: string;
  opinion: string;
};

interface RestaurantReviewRepository {
  getUsersRestaurantReview: ({
    reviewer_id,
    token,
  }: {
    reviewer_id: number;
    token?: string;
  }) => Promise<GetUsersRestaurantReviewRes>;
  postRestaurantReview: ({ review, external, token }: PostRestaurantReviewReq) => Promise<any>;
  deleteRestaurantReview: ({ reviewId, token }: DeleteRestaurantReviewType) => Promise<any>;
  updateRestaurantReview: ({
    reviewId,
    token,
    category,
    keywords,
    prices,
    summary,
    opinion,
  }: UpdateRestaurantReviewType) => Promise<any>;
}

interface GetUsersRestaurantReviewRes {
  user: {
    id: number;
    nickname: string;
    reviews: number;
  };
  reviews: RestaurantReviewItemType[];
}

export const restaurantReviewRepository = (): RestaurantReviewRepository => {
  return {
    getUsersRestaurantReview: async ({ reviewer_id, token }) =>
      await http.get<GetUsersRestaurantReviewRes>(`/apis/v1/restaurant/reviewer/${reviewer_id}/review`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    postRestaurantReview: async ({ review, external, token }) =>
      await http.post<{}, PostRestaurantReviewReq>(
        '/apis/v1/restaurant/review',
        { review, external },
        token
          ? {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          : undefined
      ),
    deleteRestaurantReview: async ({ reviewId, token }) =>
      await http.delete(`/apis/v1/restaurant/review/${reviewId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    updateRestaurantReview: async ({ reviewId, token, category, keywords, prices, summary, opinion }) =>
      await http.put(
        `/apis/v1/restaurant/review/${reviewId}`,
        {
          category,
          keywords,
          prices,
          summary,
          opinion,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ),
  };
};
