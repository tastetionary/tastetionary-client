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

const modalSettings = ($visible: boolean) => css`
  visibility: ${$visible ? 'visible' : 'hidden'};
  z-index: 15;
  animation: ${$visible ? fadeIn : fadeOut} 0.25s ease-in-out;
  transition: visibility 0.25s ease-in-out;
`;

export const Overlay = styled.div<{
  $visible: boolean;
  zIndex?: number;
}>`
  position: fixed;
  top: 0;
  left: 0;
  bottom: env(safe-area-inset-bottom);
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);

  width: 100%;
  height: -webkit-fill-available;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${({ zIndex }) => zIndex ?? '30'};

  ${({ $visible }) => modalSettings($visible)}
`;

export const Container = styled.div<{ $visible: boolean }>`
  max-width: 320px;
  width: 100%;
  height: auto;
  border-radius: 2px;
  border: 2px solid ${({ theme }) => theme.colors.neutral.bg80};
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.white};
  ${({ $visible }) => modalSettings($visible)}

  @media screen and (max-width: 320px) {
    max-width: calc(100vw - 40px);
  }
`;

export const TextContainer = styled.div``;

export const Title = styled.div`
  padding: 24px;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%;
`;

export const Message = styled.p`
  padding: 8px 24px;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%;
  color: ${({ theme }) => theme.colors.neutral.bg40};
`;

export const ButtonContainer = styled.div`
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
`;

export const Button = styled.button<{ $isSecondary?: boolean }>`
  padding: 8px 16px;
  height: 48px;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  color: ${({ $isSecondary, theme }) => ($isSecondary ? theme.colors.neutral.bg40 : theme.colors.secondary.o70)};
`;
