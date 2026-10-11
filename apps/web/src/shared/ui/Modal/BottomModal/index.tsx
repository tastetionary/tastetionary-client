import { ReactNode, useEffect, useState } from 'react';
import { MODAL_TYPES } from '../GlobalModal';
import useModal from '../GlobalModal/hooks/useModal';
import * as S from './style';
import IC_EXPAND_MORE from '@/assets/common/Icons/expandmore.svg';
import { cn } from '@/shared/utils/styles.utils';

interface Props {
  content?: ReactNode;
  removeExpandBtn?: boolean;
  /** actionSheet: 상단 손잡이와 둥근 모서리를 가진 짧은 선택 메뉴. 펼침 버튼은 쓰지 않는다. */
  variant?: 'default' | 'actionSheet';
}

export default function BottomModal({ content, removeExpandBtn, variant = 'default' }: Props) {
  const { closeModal } = useModal();

  const [animate, setAnimate] = useState(false);
  const [expand, setExpand] = useState(false);

  const state = animate ? 'visible' : 'default';
  const expandState = expand ? 'expand' : 'fold';
  const isActionSheet = variant === 'actionSheet';
  const hideExpandBtn = removeExpandBtn || isActionSheet;

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
      <div className={cn(S.bottomModalContainerVariants({ animation: state, expand: expandState, variant }))}>
        <div className={cn('flex w-full items-center justify-center', hideExpandBtn ? '' : 'py-12')}>
          {isActionSheet && <div className="mt-[12px] mb-[4px] h-4 w-40 rounded-2 bg-neutral-bg20" aria-hidden />}

          {!hideExpandBtn && (
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
          )}
        </div>

        <div className={cn(S.bottomModalContentVariants({ expand: expandState }))}>{content ?? <></>}</div>
      </div>
    </div>
  );
}
