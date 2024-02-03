import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface SelectRestaurantState {
  category: string[];
  keyword: string[];
  price: number;
  setRestaurantCategory: (value: string[]) => void;
  setRestaurantKeyword: (value: string[]) => void;
  setRestaurantPrice: (value: number) => void;
  resetSelectRestaurant: () => void;
}

export const useSelectRestaurantStore = create<SelectRestaurantState>()(
  devtools(
    persist(
      set => ({
        category: [],
        keyword: [],
        price: 0,
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
            price: value,
          }),
        resetSelectRestaurant: () =>
          set({
            category: [],
            keyword: [],
            price: 0,
          }),
      }),
      {
        name: 'select-restaurant-storage',
      }
    )
  )
);
