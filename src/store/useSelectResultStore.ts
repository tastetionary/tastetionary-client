import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export type PriceRange = '~10,000' | '10,000~13,000' | '13,000~16,000' | '16,000~20,000' | '20,000~';

interface RestaurantInfo {
  name?: string;
  latitude: number;
  longitude: number;
  id: string;
  review?: {
    total: number;
    keywords: string[];
    prices: number[];
    revisitRatio: number;
    aggregatePrice: { [key: string]: number };
  };
}

interface SelectResultState {
  food?: {
    id: number;
    name?: string;
  };
  restaurant?: RestaurantInfo;
  setSelectFoodResult: (value: { id: number; name?: string }) => void;
  setSelectRestaurantResult: (value: RestaurantInfo) => void;
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
};

export const useSelectResultStore = create<SelectResultState>()(
  devtools(
    persist(
      set => ({
        food: defaultFood,
        restaurant: defaultRestaurant,
        setSelectFoodResult: value =>
          set({
            food: {
              id: value.id,
              name: value.name,
            },
          }),
        setSelectRestaurantResult: value => {
          return set({
            restaurant: {
              name: value.name,
              latitude: value.latitude,
              id: value.id,
              longitude: value.longitude,
              ...(value.review?.total && value.review?.keywords && value.review?.prices && value.review?.revisitRatio
                ? {
                    review: {
                      total: value.review?.total,
                      keywords: value.review?.keywords,
                      prices: value.review?.prices,
                      aggregatePrice: value.review.aggregatePrice,
                      revisitRatio: value.review?.revisitRatio,
                    },
                  }
                : {}),
            },
          });
        },

        resetFoodResult: () =>
          set({
            food: defaultFood,
          }),
        resetRestaurantResult: () =>
          set({
            restaurant: defaultRestaurant,
          }),
      }),
      {
        name: 'select-result-storage',
      }
    )
  )
);
