import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface ReviewState {
  category: string[];
  keyword: string[];
  price: number;
  resetReviewState: () => void;
  setReviewCategory: (value: string[]) => void;
  setReviewKeyword: (value: string[]) => void;
  setReviewPrice: (value: number) => void;
}

export const useReviewStore = create<ReviewState>()(
  devtools(set => ({
    category: [],
    keyword: [],
    price: 0,
    resetReviewState: () =>
      set({
        category: [],
        keyword: [],
        price: 0,
      }),
    setReviewCategory: value =>
      set({
        category: value,
      }),
    setReviewKeyword: value =>
      set({
        keyword: value,
      }),
    setReviewPrice: value =>
      set({
        price: value,
      }),
  }))
);
