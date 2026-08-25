import { useEffect, useState } from 'react';
import * as S from './style';
import { cn } from '@/shared/utils/styles.utils';

export interface ExampleModalProps {
  title: string;
  message?: string;
  cancelText?: string;
  confirmText?: string;
  handleClose?: (...arg: any[]) => any;
  handleConfirm: (...arg: any[]) => any;
}

export default function ExampleModal({
  title,
  message,
  cancelText,
  confirmText = '확인',
  handleClose,
  handleConfirm,
}: ExampleModalProps) {
  const [animate, setAnimate] = useState(false);

  const onClose = () => {
    setAnimate(false);

    if (handleClose) {
      setTimeout(() => {
        handleClose();
      }, 100);
    }
  };

  const onConfirm = () => {
    setAnimate(false);

    if (handleConfirm) {
      setTimeout(() => {
        handleConfirm();
      }, 100);
    }
  };

  useEffect(() => {
    setAnimate(true);
  }, []);

  const state = animate ? 'visible' : 'default';

  return (
    <div className={cn(S.overlayVariants({ visibility: state, animation: state }))}>
      <div className={cn(S.containerVariants({ visibility: state, animation: state }))}>
        <div className="px-8 pt-8 pb-20">
          <div className="text-20 leading-[28px] font-bold text-black">{title}</div>
          {message && <p className="mt-[12px] text-15 leading-[21px] font-normal text-neutral-bg80">{message}</p>}
        </div>

        <div className={cn('flex items-center gap-xs', cancelText ? 'justify-start' : 'justify-end')}>
          <>
            {cancelText && (
              <button
                className={cn(S.buttonVariants({ color: 'isSecondary' }))}
                onClick={() => {
                  if (onClose) onClose();
                }}
              >
                {cancelText}
              </button>
            )}

            <button className={cn(S.buttonVariants({ color: 'default' }))} onClick={onConfirm}>
              {confirmText}
            </button>
          </>
        </div>
      </div>
    </div>
  );
}
