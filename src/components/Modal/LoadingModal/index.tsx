import Lottie from 'lottie-react';
import { useEffect, useState } from 'react';
import { MODAL_TYPES } from '../GlobalModal';
import useModal from '../GlobalModal/hooks/useModal';
import BookAnimation from './book_animation.json';
import * as S from './page.styled';

export interface LoadingModalProps {
  handleClose?: () => void;
}

export default function LoadingModal({ handleClose }: LoadingModalProps) {
  const { closeModal } = useModal();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (animate) {
      const closeEvent = setTimeout(() => {
        setAnimate(false);
        if (handleClose) handleClose();
        closeModal(MODAL_TYPES.loading);
      }, 3000);

      return () => clearTimeout(closeEvent);
    }
  }, [animate]);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <S.Overlay $visible={animate}>
      <S.Container $visible={animate}>
        <Lottie
          autoPlay={true}
          loop={true}
          rendererSettings={{
            preserveAspectRatio: '',
          }}
          animationData={BookAnimation}
          height={200}
          width={200}
        />
      </S.Container>
    </S.Overlay>
  );
}
