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
  max-width: 300px;
  width: 100%;
  height: auto;
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  ${({ $visible }) => modalSettings($visible)}

  @media screen and (max-width: 320px) {
    max-width: calc(100vw - 40px);
  }
`;
