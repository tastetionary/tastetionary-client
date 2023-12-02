import { ReactNode, useEffect, useState } from 'react';
import * as S from './page.styled';

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
    <S.Overlay $visible={animate}>
      <S.Container $visible={animate}>
        <S.TextContainer>
          <S.Title>{title}</S.Title>

          {(message || elementMessage) && (
            <S.MessageContainer>
              {message && <S.Message>{message}</S.Message>}
              {elementMessage ?? null}
            </S.MessageContainer>
          )}
        </S.TextContainer>

        <S.ButtonContainer>
          <>
            {cancelText && (
              <S.Button
                $isSecondary={true}
                onClick={() => {
                  if (onClose) onClose();
                }}
              >
                {cancelText}
              </S.Button>
            )}

            <S.Button onClick={onConfirm}>{confirmText}</S.Button>
          </>
        </S.ButtonContainer>
      </S.Container>
    </S.Overlay>
  );
}
