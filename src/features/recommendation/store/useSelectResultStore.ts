import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { type RestaurantReview } from '@/features/recommendation/api/restaurant/recommend';

export type PriceRange = '~10,000' | '10,000~13,000' | '13,000~16,000' | '16,000~20,000' | '20,000~';

interface RestaurantInfo {
  name?: string;
  latitude: number;
  longitude: number;
  id: string;
  bookmark?: boolean;
  review?: {
    total: number;
    keywords: string[];
    revisitRatio: number;
    aggregatePrice: { [key: string]: number };
  };
  reviews: RestaurantReview[];
}

interface SelectResultState {
  food?: {
    id: number;
    name?: string;
  };
  restaurant?: RestaurantInfo;
  setSelectFoodResult: (value: { id: number; name?: string }) => void;
  setSelectRestaurantResult: (value: RestaurantInfo) => void;
  updateReviewReact: (reviewId: string, type: 'L' | 'D') => void;
  resetFoodResult: () => void;
  resetRestaurantResult: () => void;
}

const defaultFood = {
  id: 0,
  name: undefined,
};

const defaultRestaurant = {
  name: undefined,
  latitude: 0,
  longitude: 0,
  id: '0',
  bookmark: false,
  reviews: [],
};

export const useSelectResultStore = create<SelectResultState>()(
  devtools(
    persist(
      immer(set => ({
        food: defaultFood,
        restaurant: defaultRestaurant,
        setSelectFoodResult: value =>
          set(state => {
            state.food = {
              id: value.id,
              name: value.name,
            };
          }),
        setSelectRestaurantResult: value =>
          set(state => {
            state.restaurant = {
              name: value.name,
              latitude: value.latitude,
              id: value.id,
              longitude: value.longitude,
              reviews: value.reviews,
              bookmark: value.bookmark,
              ...(value.review?.total &&
              value.review?.keywords &&
              value.review?.aggregatePrice &&
              value.review?.revisitRatio
                ? {
                    review: {
                      total: value.review.total,
                      keywords: value.review.keywords,
                      aggregatePrice: value.review.aggregatePrice,
                      revisitRatio: value.review.revisitRatio,
                    },
                  }
                : {}),
            };
          }),
        updateReviewReact: (reviewId, type) =>
          set(state => {
            const review = state?.restaurant?.reviews.find((r: RestaurantReview) => r.id === reviewId);

            if (!review) return;

            // 이전 반응 제거
            if (review.userReaction) {
              review.reviewReactionCnt[review.userReaction] = Math.max(
                0,
                review.reviewReactionCnt[review.userReaction] - 1
              );
            }

            // 새로운 반응 추가
            review.reviewReactionCnt[type] += 1;
            review.userReaction = type;
          }),
        resetFoodResult: () =>
          set(state => {
            state.food = defaultFood;
          }),
        resetRestaurantResult: () =>
          set(state => {
            state.restaurant = defaultRestaurant;
          }),
      })),
      {
        name: 'select-result-storage',
      }
    )
  )
);
