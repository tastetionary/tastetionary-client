import { useModalStore } from '@/store/useModalStore';

export default function useModal() {
  const { modals, openModal, closeModal } = useModalStore();
  return { modals, openModal, closeModal };
}
