import Slider from 'rc-slider';
import styled from 'styled-components';

export const StyledSlider = styled(Slider)`
  width: calc(100% - 28px);
  height: 20px;
  margin: 0 auto;

  .rc-slider-rail {
    border-radius: 0;
    height: 20px;
    border: 2px solid ${({ theme }) => theme.colors.neutral.bg20};
    background-color: ${({ theme }) => theme.colors.neutral.bg05};
  }

  .rc-slider-track {
    border-radius: 0;
    height: 20px;
    border: 2px solid ${({ theme }) => theme.colors.secondary.o50};
    background-color: ${({ theme }) => theme.colors.primary.y70};
  }

  .rc-slider-dot {
    width: 2px;
    height: 20px;
    background-color: ${({ theme }) => theme.colors.neutral.bg20};
    border: none;
    border-radius: 0;
    bottom: auto;

    &:first-child,
    &:last-child {
      width: 0;
    }
  }

  .rc-slider-dot-active {
    border: none;
    background-color: ${({ theme }) => theme.colors.secondary.o50};
  }

  .rc-slider-handle {
    width: 32px;
    height: 32px;
    background-image: url('/image/Slider/slider_handle.svg');
    margin-top: -6px;
    opacity: 1;
    border: none !important;
    border-radius: 0 !important;
    box-shadow: none !important;
  }

  .rc-slider-handle-1,
  .rc-slider-handle-2,
  .rc-slider-handle-3,
  .rc-slider-handle-4 {
    display: none;
  }

  .rc-slider-mark {
    top: 42px;

    span {
      width: max-content;
      font-size: 11px;
      font-style: normal;
      font-weight: 400;
      color: ${({ theme }) => theme.colors.neutral.bg40};
    }
  }
`;
