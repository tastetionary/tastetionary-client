import { cn } from '@/utils/styles.utils';
import Lottie from 'lottie-react';
import { useEffect, useState } from 'react';
import { overlayVariants } from '../DialogModal/style';
import { MODAL_TYPES } from '../GlobalModal';
import useModal from '../GlobalModal/hooks/useModal';
import BookAnimation from './book_animation.json';
import * as S from './style';

export interface LoadingModalProps {
  handleClose?: () => void;
}

export default function LoadingModal({ handleClose }: LoadingModalProps) {
  const { closeModal } = useModal();
  const [animate, setAnimate] = useState(false);

  const state = animate ? 'visible' : 'default';

  useEffect(() => {
    if (animate) {
      const closeEvent = setTimeout(() => {
        setAnimate(false);
        if (handleClose) handleClose();
        closeModal(MODAL_TYPES.loading);
      }, 1000);

      return () => clearTimeout(closeEvent);
    }
  }, [animate]);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div className={cn(overlayVariants({ visibility: state, animation: state }))}>
      <div className={cn(S.loadingModalContainerVariants({ visibility: state, animation: state }))}>
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
      </div>
    </div>
  );
}
