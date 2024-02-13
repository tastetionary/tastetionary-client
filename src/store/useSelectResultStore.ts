import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface RestaurantInfo {
  name?: string;
  latitude: number;
  longitude: number;
  review?: {
    total: number;
    keywords: string[];
    aggregatePrice: {
      avg: number;
      [key: string]: number;
    };
    revisitRatio: number;
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
        setSelectRestaurantResult: value =>
          set({
            restaurant: {
              name: value.name,
              latitude: value.latitude,
              longitude: value.longitude,
              ...(value.review?.total &&
              value.review?.keywords &&
              value.review?.aggregatePrice &&
              value.review?.revisitRatio
                ? {
                    review: {
                      total: value.review?.total,
                      keywords: value.review?.keywords,
                      aggregatePrice: value.review?.aggregatePrice,
                      revisitRatio: value.review?.revisitRatio,
                    },
                  }
                : {}),
            },
          }),
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
