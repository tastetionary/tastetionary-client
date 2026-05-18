import { ComponentProps, FunctionComponent } from 'react';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type Modals = {
  Component: FunctionComponent<any>;
  props: ComponentProps<FunctionComponent<any>>;
};

interface ModalState {
  modals: Modals[];
  openModal: <T extends FunctionComponent<any>>(Component: T, props: Omit<ComponentProps<T>, 'open'>) => void;
  closeModal: <T extends FunctionComponent<any>>(Component: T) => void;
}

export const useModalStore = create<ModalState>()(
  devtools(set => ({
    modals: [],
    openModal: <T extends FunctionComponent<any>>(Component: T, props: Omit<ComponentProps<T>, 'open'>) => {
      set(state => ({
        modals: [...state.modals, { Component, props: { ...props, open: true } }],
      }));
    },
    closeModal: <T extends FunctionComponent<any>>(Component: T) => {
      setTimeout(() => {
        set(state => ({
          modals: state.modals.filter(modal => modal.Component !== Component),
        }));
      }, 150);
    },
  }))
);
