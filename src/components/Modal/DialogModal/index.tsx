import { cn } from '@/utils/styles.utils';
import { ReactNode, useEffect, useState } from 'react';
import * as S from './style';

export interface DialogModalProps {
  title: string;
  message?: string;
  elementMessage?: ReactNode;
  cancelText?: string;
  confirmText?: string;
  handleClose?: (...arg: any[]) => any;
  handleConfirm: (...arg: any[]) => any;
  needClose?: boolean;
}

export default function DialogModal({
  title,
  message,
  elementMessage,
  cancelText,
  confirmText = '확인',
  handleClose,
  handleConfirm,
  needClose,
}: DialogModalProps) {
  const [animate, setAnimate] = useState(false);

  const state = animate ? 'visible' : 'default';

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

    if (needClose) onClose();

    if (handleConfirm) {
      setTimeout(() => {
        handleConfirm();
      }, 100);
    }
  };

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div className={cn(S.overlayVariants({ visibility: state, animation: state }))}>
      <div className={cn(S.dialogModalContainerVariants({ visibility: state, animation: state }))}>
        <div>
          <div className="whitespace-pre-line break-keep p-24 text-16 font-bold leading-[140%]">{title}</div>

          {(message || elementMessage) && (
            <div className="px-24 py-8">
              {message && (
                <p className="whitespace-pre-line break-keep text-14 font-normal leading-[160%] text-neutral-bg40">
                  {message}
                </p>
              )}
              {elementMessage ?? null}
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-8 p-8">
          <>
            {cancelText && (
              <button
                className={cn(S.dialogModalButtonVariants({ color: 'isSecondary' }))}
                onClick={() => {
                  if (onClose) onClose();
                }}
              >
                {cancelText}
              </button>
            )}

            <button className={cn(S.dialogModalButtonVariants({ color: 'default' }))} onClick={onConfirm}>
              {confirmText}
            </button>
          </>
        </div>
      </div>
    </div>
  );
}
