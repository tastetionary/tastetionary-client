import { cva } from 'class-variance-authority';
import styled from 'styled-components';

export const agreeAllCheckedVariants = cva('flex justify-center border-1 border-solid border-black p-[3%]', {
  variants: {
    checked: {
      default: 'bg-white',
      all: 'bg-secondary-o40',
    },
  },
});

export const CheckboxWrapper = styled.div``;
