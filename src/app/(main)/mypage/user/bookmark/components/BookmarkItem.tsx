import { useMutation, useQueryClient } from '@tanstack/react-query';
import IC_CLOSE from '@/assets/common/Icons/close.svg';
import preferenceRepository, { GetPreferenceRes } from '@/shared/api/user/preference';
import useToken from '@/shared/hooks/useToken';
import { MODAL_TYPES } from '@/shared/ui/Modal/GlobalModal';
import useModal from '@/shared/ui/Modal/GlobalModal/hooks/useModal';
import { iconToast } from '@/shared/ui/Toast';

type PreferenceListItemType = Pick<GetPreferenceRes, 'address' | 'name' | 'phone' | 'id'> & {
  type: 'bookmark' | 'excluded';
};

export function PreferenceListItem({ type, name, phone, address, id }: PreferenceListItemType) {
  const { openModal, closeModal } = useModal();
  const { token } = useToken();
  const queryClient = useQueryClient();

  const { mutate: deletePreference } = useMutation({
    mutationFn: preferenceRepository().deletePreference,
    onSuccess: () => {
      queryClient.setQueryData(
        [type === 'bookmark' ? 'my-bookmark' : 'my-excluded', token],
        (oldData: GetPreferenceRes[]) => oldData.filter(data => data.id !== id)
      );
      iconToast(type === 'bookmark' ? '북마크가 삭제되었어요' : '제외 식당에서 삭제되었어요', 'check');
      closeModal(MODAL_TYPES.dialog);
      closeModal(MODAL_TYPES.bottom);
    },
  });

  const deletePreferenceAskModal = () => {
    openModal(MODAL_TYPES.dialog, {
      title: type === 'bookmark' ? '북마크 삭제' : '추천 제외 식당 삭제',
      message:
        type === 'bookmark'
          ? '해당 식당에 대한 북마크를 삭제하시겠어요?'
          : '해당 식당을 추천 제외 식당에서 삭제하시겠어요?',
      cancelText: '취소',
      confirmText: '삭제',
      handleConfirm: () => deletePreference({ category: type, token, restaurantId: +id }),
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

      <button onClick={deletePreferenceAskModal}>
        <IC_CLOSE />
      </button>
    </div>
  );
}
