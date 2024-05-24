import IC_EXPAND_MORE from '@/assets/common/Icons/expandmore.svg';
import { cn } from '@/utils/styles.utils';
import { ReactNode, useEffect, useState } from 'react';
import { MODAL_TYPES } from '../GlobalModal';
import useModal from '../GlobalModal/hooks/useModal';
import * as S from './style';

interface Props {
  content?: ReactNode;
}

export default function BottomModal({ content }: Props) {
  const { closeModal } = useModal();

  const [animate, setAnimate] = useState(false);

  const state = animate ? 'visible' : 'default';

  const onClose = () => {
    setAnimate(false);

    setTimeout(() => {
      closeModal(MODAL_TYPES.bottom);
    }, 400);
  };

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div
      className={cn(S.overlayVariants({ visibility: state, animation: state }))}
      onClick={e => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={cn(S.bottomModalContainerVariants({ animation: state }))}>
        <div className="flex w-full items-center justify-center gap-4 py-12">
          <span className="text-12 leading-[100%] text-neutral-bg40">리스트 보기</span>
          <IC_EXPAND_MORE width={16} height={16} />
        </div>

        <div className="overflow-y-auto">{content ?? <></>}</div>
      </div>
    </div>
  );
}
