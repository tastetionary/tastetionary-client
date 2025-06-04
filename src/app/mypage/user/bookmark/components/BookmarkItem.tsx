import preferenceRepository, { GetPreferenceRes } from '@/apis/user/preference';
import IC_CLOSE from '@/assets/common/Icons/close.svg';
import { MODAL_TYPES } from '@/components/Modal/GlobalModal';
import useModal from '@/components/Modal/GlobalModal/hooks/useModal';
import { iconToast } from '@/components/Toast';
import useToken from '@/hooks/useToken';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function BookmarkItem({
  name,
  phone,
  address,
  id,
}: Pick<GetPreferenceRes, 'address' | 'name' | 'phone' | 'id'>) {
  const { openModal, closeModal } = useModal();
  const { token } = useToken();
  const queryClient = useQueryClient();

  const { mutate: deleteBookmark } = useMutation({
    mutationFn: preferenceRepository().deletePreference,
    onSuccess: () => {
      queryClient.setQueryData(['my-bookmark', token], (oldData: GetPreferenceRes[]) =>
        oldData.filter(data => data.id !== id)
      );
      iconToast('북마크가 삭제되었어요', 'check');
      closeModal(MODAL_TYPES.dialog);
      closeModal(MODAL_TYPES.bottom);
    },
  });

  const bookmarkDeleteAskModal = () => {
    openModal(MODAL_TYPES.dialog, {
      title: '북마크 삭제',
      message: '해당 식당에 대한 북마크를 삭제하시겠어요?',
      cancelText: '취소',
      confirmText: '삭제',
      handleConfirm: () => deleteBookmark({ category: 'bookmark', token, restaurantId: +id }),
    });
  };

  return (
    <div className="flex w-full items-start gap-md border-b border-solid border-neutral-bg20 px-xl py-md">
      <div className="w-full">
        <div className="flex items-center gap-xs">
          <div className="body2 font-bold">{name}</div>
        </div>

        <div className="body3 text-neutral-bg60">{address}</div>

        <div className="body2">{phone}</div>
      </div>

      <button onClick={bookmarkDeleteAskModal}>
        <IC_CLOSE />
      </button>
    </div>
  );
}
