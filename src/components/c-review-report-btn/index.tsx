import useReviewReportMutation from '@/app/select-restaurant/result/review/[restaurantId]/_hooks/useReviewReportMutation';
import IC_REPORT from '@/assets/common/Icons/report.svg';
import { MODAL_TYPES } from '@/components/Modal/GlobalModal';
import useModal from '@/components/Modal/GlobalModal/hooks/useModal';
import { toast } from 'react-toastify';

interface Props {
  id: string | undefined;
}

export default function CReviewReportBtn({ id }: Props) {
  const { postReportMutate } = useReviewReportMutation();
  const { openModal, closeModal } = useModal();

  const reportModal = () => {
    openModal(MODAL_TYPES.dialog, {
      title: '리뷰 신고하기',
      message: '해당 리뷰를 신고하시겠습니까?',
      elementMessage: (
        <span className="text-12 font-normal leading-[19.2px] text-neutral-bg20">
          신고 시 관리자 검토 후에
          <br />
          리뷰 삭제 및 적절한 조치가 이뤄집니다.
        </span>
      ),
      handleConfirm: () => {
        postReportMutate({
          reviewId: Number(id),
          content: 'string',
          category: '부적절한 내용',
        });

        toast.success('신고 완료 되었습니다.');
        closeModal(MODAL_TYPES.dialog);
      },
      confirmText: '신고하기',
      cancelText: '취소',
      handleClose: () => closeModal(MODAL_TYPES.dialog),
      needClose: true,
    });
  };

  return (
    <button onClick={reportModal} className="flex cursor-pointer items-center justify-center px-10 py-10">
      <IC_REPORT />
    </button>
  );
}
