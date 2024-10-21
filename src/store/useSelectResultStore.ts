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
    priceList: Array<Record<PriceRange, number>>;
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
          const priceList: PriceRange[] = ['~10,000', '10,000~13,000', '13,000~16,000', '16,000~20,000', '20,000~'];

          const getPriceRange = () => {
            const priceRange: Array<Record<PriceRange, number>> = priceList.map(range => ({ [range]: 0 })) as Array<
              Record<PriceRange, number>
            >;

            value.review?.prices?.forEach(p => {
              if (p < 10000) {
                priceRange[0]['~10,000'] += 1;
              } else if (10000 <= p && p < 13000) {
                priceRange[1]['10,000~13,000'] += 1;
              } else if (13000 <= p && p < 16000) {
                priceRange[2]['13,000~16,000'] += 1;
              } else if (16000 <= p && p < 20000) {
                priceRange[3]['16,000~20,000'] += 1;
              } else {
                priceRange[4]['20,000~'] += 1;
              }
            });

            return priceRange;
          };

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
                      priceList: getPriceRange(),
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
