import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface SelectRestaurantState {
  category: string[];
  keyword: string[];
  prices: string[];
  setRestaurantCategory: (value: string[]) => void;
  setRestaurantKeyword: (value: string[]) => void;
  setRestaurantPrice: (value: string[]) => void;
  resetSelectRestaurant: () => void;
}

export const useSelectRestaurantStore = create<SelectRestaurantState>()(
  devtools(
    persist(
      set => ({
        category: [],
        keyword: [],
        prices: [],
        setRestaurantCategory: value =>
          set({
            category: value,
          }),
        setRestaurantKeyword: value =>
          set({
            keyword: value,
          }),
        setRestaurantPrice: value =>
          set({
            prices: value,
          }),
        resetSelectRestaurant: () =>
          set({
            category: [],
            keyword: [],
            prices: [],
          }),
      }),
      {
        name: 'select-restaurant-storage',
      }
    )
  )
);
