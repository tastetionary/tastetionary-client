import DefaultButton from '@/components/Button/DefaultButton';
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
        <div className="flex flex-col gap-md">
          <div className="title2 whitespace-pre-line break-keep font-bold">{title}</div>

          {(message || elementMessage) && (
            <div>
              {message && <p className="body2 whitespace-pre-line break-keep">{message}</p>}
              {elementMessage ?? null}
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-xs p-8">
          <>
            {cancelText && (
              <DefaultButton
                bgColor="none"
                onClick={() => {
                  if (onClose) onClose();
                }}
                customStyle="px-12 py-4"
              >
                <span className="body2">{cancelText}</span>
              </DefaultButton>
            )}

            <DefaultButton bgColor="yellow" onClick={onConfirm} customStyle="px-12 py-4">
              <span className="body2 text-white">{confirmText}</span>
            </DefaultButton>
          </>
        </div>
      </div>
    </div>
  );
}
