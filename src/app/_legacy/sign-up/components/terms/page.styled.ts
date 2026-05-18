import { cva } from 'class-variance-authority';
import styled from 'styled-components';

export const agreeAllCheckedVariants = cva('flex justify-center p-[3%]', {
  variants: {
    checked: {
      default:
        'border-[1px] border-solid border-black bg-white shadow-[1px_1px_0px_0px_rgba(0,0,0,0.25)_inset,-1px_-1px_0px_0px_rgba(0,0,0,0.25)_inset]',
      all: 'border-[1px] border-solid border-[#FF5601] bg-secondary-o40 shadow-[1px_1px_0px_0px_rgba(255,86,1,0.25)_inset,-1px_-1px_0px_0px_rgba(255,86,1,0.25)_inset]',
    },
  },
});

export const CheckboxWrapper = styled.div``;
