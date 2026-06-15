import { useModalStore } from '@/shared/store/useModalStore';

export default function useModal() {
  const { modals, openModal, closeModal } = useModalStore();
  return { modals, openModal, closeModal };
}
