import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface SelectResultState {
  food?: {
    id: number;
    name?: string;
  };
  restaurant?: {
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
  };
  setSelectFoodResult: (value: { id: number; name?: string }) => void;
  setSelectRestaurantResult: (value: {
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
  }) => void;
}

export const useSelectResultStore = create<SelectResultState>()(
  devtools(
    persist(
      set => ({
        food: {
          id: 0,
          name: undefined,
        },
        restaurant: {
          name: undefined,
          latitude: 0,
          longitude: 0,
        },
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
      }),
      {
        name: 'select-result-storage',
      }
    )
  )
);
