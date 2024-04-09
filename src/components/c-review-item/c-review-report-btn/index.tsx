import { MODAL_TYPES } from '@/components/Modal/GlobalModal';
import useModal from '@/components/Modal/GlobalModal/hooks/useModal';
import { toast } from 'react-toastify';
import * as S from './page.styled';

export default function CReviewReportBtn() {
  const { openModal, closeModal } = useModal();

  const reportModal = () => {
    openModal(MODAL_TYPES.dialog, {
      title: '리뷰 신고하기',
      message: '해당 리뷰를 신고하시겠습니까?',
      elementMessage: (
        <S.Text>
          신고 시 관리자 검토 후에
          <br />
          리뷰 삭제 및 적절한 조치가 이뤄집니다.
        </S.Text>
      ),
      handleConfirm: () => {
        toast.success('신고 완료 되었습니다.');
        closeModal(MODAL_TYPES.dialog);
      },
      confirmText: '신고하기',
      cancelText: '취소',
      handleClose: () => closeModal(MODAL_TYPES.dialog),
      needClose: true,
    });
  };

  return <S.Button onClick={reportModal} />;
}
