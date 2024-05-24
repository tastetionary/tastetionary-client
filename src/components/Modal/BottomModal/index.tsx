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
  const [expand, setExpand] = useState(false);

  const state = animate ? 'visible' : 'default';
  const expandState = expand ? 'expand' : 'fold';

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
      <div className={cn(S.bottomModalContainerVariants({ animation: state, expand: expandState }))}>
        <div className="flex w-full  items-center justify-center py-12">
          <div
            className="flex cursor-pointer items-center justify-center gap-4"
            onClick={() => setExpand(prev => !prev)}
          >
            <span className="text-12 leading-[100%] text-neutral-bg40">{expand ? '지도 보기' : '리스트 보기'}</span>
            <IC_EXPAND_MORE
              width={16}
              height={16}
              style={{
                transform: expand ? 'rotate(180deg)' : 'none',
                transition: 'transform ease-in-out 300ms',
              }}
            />
          </div>
        </div>

        <div className={cn(S.bottomModalContentVariants({ expand: expandState }))}>{content ?? <></>}</div>
      </div>
    </div>
  );
}
