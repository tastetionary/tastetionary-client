import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import IC_MORE from '@/assets/common/Icons/more.svg';
import { RestaurantReviewItemType, restaurantReviewRepository } from '@/features/reviews/api';
import { useReviewPlaceInfoStore } from '@/features/reviews/store/useReviewPlaceInfoStore';
import useToken from '@/shared/hooks/useToken';
import DefaultButton from '@/shared/ui/Button/DefaultButton';
import { MODAL_TYPES } from '@/shared/ui/Modal/GlobalModal';
import useModal from '@/shared/ui/Modal/GlobalModal/hooks/useModal';
import { iconToast } from '@/shared/ui/Toast';

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
    // 기존 내용(키워드·가격대·한 줄 리뷰·재방문 의사)은 수정 화면이 ['my-reivews'] 캐시에서 id 로 찾아 채운다.
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

  // 더보기 메뉴: 식당 이름을 제목으로 두고, 항목은 큼직하게, 아래에 취소 버튼을 둔 액션 시트 (QA #8)
  const reviewOptionModal = () => {
    openModal(MODAL_TYPES.bottom, {
      variant: 'actionSheet',
      content: (
        <div className="flex flex-col px-xl pt-xs pb-md">
          <p className="body3 truncate px-xs pb-xs text-center text-neutral-bg40">{restaurant.name}</p>

          <button type="button" onClick={onReviewUpdateClick} className="body1 w-full py-14 text-center">
            리뷰 수정
          </button>

          <button
            type="button"
            onClick={reviewDeleteAskModal}
            className="body1 w-full border-t border-solid border-neutral-bg10 py-14 text-center text-simentic-r90"
          >
            리뷰 삭제
          </button>

          <DefaultButton
            bgColor="gray"
            type="button"
            customStyle="mt-xs w-full py-14"
            onClick={() => closeModal(MODAL_TYPES.bottom)}
          >
            <span className="body1">취소</span>
          </DefaultButton>
        </div>
      ),
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
