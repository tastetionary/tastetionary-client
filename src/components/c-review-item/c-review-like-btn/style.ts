import { cva } from 'class-variance-authority';
import styled from 'styled-components';

export const LikedBtn = styled.button<{ $clicked?: boolean }>`
  width: 100%;
  padding: 10px;
  border: 1px solid ${({ theme, $clicked }) => ($clicked ? theme.colors.secondary.o30 : theme.colors.neutral.bg80)};
  background-color: ${({ theme, $clicked }) => ($clicked ? theme.colors.secondary.o05 : theme.colors.white)};
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    font-size: 12px;
    line-height: 12px;
    color: ${({ theme, $clicked }) => ($clicked ? theme.colors.secondary.o50 : theme.colors.neutral.bg80)};
  }
`;

export const likeBtnVariants = cva(
  'w-full p-10 flex justify-between items-center border-1 border-solid [&>span]:text-12 [&>span]:leading-[12px]',
  {
    variants: {
      borderColor: {
        default: 'border-neutral-bg80',
        clicked: 'border-secondary-o30',
      },
      bgColor: {
        default: 'bg-white',
        clicked: 'bg-secondary-o05',
      },
    },
  }
);
