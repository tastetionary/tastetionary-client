'use client';

import styled, { css, keyframes } from 'styled-components';

export const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const modalSettings = (visible: boolean, isMobile?: boolean) => css`
    visibility: ${visible ? 'visible' : 'hidden'};
    z-index: 15;
    animation: ${visible ? fadeIn : fadeOut} ${isMobile ? 0.4 : 0.25}s ease-in-out;
    transition: visibility ${isMobile ? 0.4 : 0.25}s ease-in-out;
`;

export const Overlay = styled.div<{
    visible: boolean;
    isMobile?: boolean;
    zIndex?: number;
}>`
    position: fixed;
    top: 0;
    left: 0;
    bottom: env(safe-area-inset-bottom);
    right: 0;
    background-color: rgba(0, 0, 0, 0.6);

    width: 100%;
    height: -webkit-fill-available;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: ${({ zIndex }) => zIndex ?? '30'};

    ${({ visible, isMobile }) => modalSettings(visible, isMobile)}
`;

export const Container = styled.div<{ visible: boolean }>`
    max-width: 320px;
    width: 100%;
    min-height: 169px;
    height: auto;
    border-radius: 20px;
    padding: 16px;
    z-index: 100;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: ${({ theme }) => theme.colors.white};
    ${({ visible }) => modalSettings(visible)}

    @media screen and (max-width: 320px) {
        max-width: calc(100vw - 40px);
    }
`;

export const TextContainer = styled.div`
    padding: 8px 8px 20px;
`;

export const Title = styled.div`
    font-weight: 700;
    font-size: 20px;
    line-height: 28px;
    color: ${({ theme }) => theme.colors.black};
`;

export const Message = styled.p`
    margin-top: 12px;
    font-weight: 400;
    font-size: 15px;
    line-height: 21px;
    color: ${({ theme }) => theme.textColor};
`;

export const ButtonContainer = styled.div<{ cancelText?: string }>`
    display: flex;
    align-items: center;
    justify-content: ${({ cancelText }) => (!cancelText ? 'flex-end' : 'flex-start')};
    gap: 8px;
`;

export const Button = styled.button<{ isSecondary?: boolean }>`
    width: 100%;
    padding: 13px 16px;
    background-color: ${({ isSecondary }) => (isSecondary ? '#F1F3F5' : '#4F4FF6')};
    border-radius: 12px;
    height: 48px;
    color: ${({ isSecondary, theme }) => (isSecondary ? theme.textColor : theme.colors.white)};
`;
