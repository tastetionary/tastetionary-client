import { useEffect, useState } from 'react';
import * as S from './page.styled';

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

    return (
        <S.Overlay visible={animate}>
            <S.Container visible={animate}>
                <S.TextContainer>
                    <S.Title>{title}</S.Title>
                    {message && <S.Message>{message}</S.Message>}
                </S.TextContainer>

                <S.ButtonContainer cancelText={cancelText}>
                    <>
                        {cancelText && (
                            <S.Button
                                isSecondary={true}
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
