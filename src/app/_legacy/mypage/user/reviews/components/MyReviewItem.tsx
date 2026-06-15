import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { RestaurantReviewItemType, restaurantReviewRepository } from '@/apis/restaurant/review';
import IC_MORE from '@/assets/common/Icons/more.svg';
import DefaultButton from '@/components/Button/DefaultButton';
import { MODAL_TYPES } from '@/components/Modal/GlobalModal';
import useModal from '@/components/Modal/GlobalModal/hooks/useModal';
import { iconToast } from '@/components/Toast';
import useToken from '@/hooks/useToken';
import { useReviewPlaceInfoStore } from '@/store/useReviewPlaceInfoStore';

export function MyReviewItem({
  id,
  keywords,
  restaurant,
  summary,
}: Pick<RestaurantReviewItemType, 'id' | 'keywords' | 'restaurant' | 'summary'>) {
  const { openModal, closeModal } = useModal();
  const { token } = useToken();
  const queryClient = useQueryClient();
  const router = useRouter();

  const setReviewPlaceInfo = useReviewPlaceInfoStore(state => state.setReviewPlaceInfo);

  const { mutate: deleteReview } = useMutation({
    mutationFn: restaurantReviewRepository().deleteRestaurantReview,
    onSuccess: () => {
      queryClient.setQueryData(['my-reivews'], (oldData: { reviews: RestaurantReviewItemType[] }) => ({
        ...oldData,
        reviews: oldData.reviews.filter(review => review.id !== id),
      }));
      iconToast('리뷰가 삭제되었어요', 'check');
      closeModal(MODAL_TYPES.dialog);
      closeModal(MODAL_TYPES.bottom);
    },
  });

  const onReviewUpdateClick = () => {
    router.push(`/register-review?update=${id}`);
    closeModal(MODAL_TYPES.bottom);
    setReviewPlaceInfo({
      id,
      placeName: restaurant.name,
      address: restaurant.address,
      latitude: '',
      longitude: '',
    });
  };

  const reviewOptionModal = () => {
    openModal(MODAL_TYPES.bottom, {
      content: (
        <div className="px-xl py-xs">
          <div onClick={onReviewUpdateClick} className="body2 cursor-pointer py-md ">
            리뷰 수정
          </div>
          <div
            onClick={reviewDeleteAskModal}
            className="body2 cursor-pointer border-t border-solid border-neutral-bg20 py-md"
          >
            리뷰 삭제
          </div>
        </div>
      ),
      removeExpandBtn: true,
    });
  };

  const reviewDeleteAskModal = () => {
    openModal(MODAL_TYPES.dialog, {
      title: '리뷰 삭제',
      message: '작성하신 식당에 대한 리뷰를 삭제하시겠어요?',
      cancelText: '취소',
      confirmText: '삭제',
      handleConfirm: () => deleteReview({ reviewId: id, token }),
    });
  };

  return (
    <div className="flex flex-col gap-sm border-b border-solid border-neutral-bg20 px-lg py-md">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-xxs">
          <div className="body2 font-bold">{restaurant.name}</div>

          <div className="body3 text-neutral-bg60">{restaurant.address}</div>
        </div>

        <button onClick={reviewOptionModal}>
          <IC_MORE width={24} height={24} />
        </button>
      </div>

      {summary && <p className="body2 text-neutral-bg80">{summary}</p>}

      <div className="flex flex-wrap items-center gap-xxs">
        {keywords.map(keyword => (
          <DefaultButton bgColor="gray" customStyle="py-2 px-8" key={keyword}>
            <span className="body4">{keyword}</span>
          </DefaultButton>
        ))}
      </div>
    </div>
  );
}
