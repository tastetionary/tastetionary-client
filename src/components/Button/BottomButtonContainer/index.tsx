import { HTMLAttributes, ReactNode } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default function BottomButtonContainer({ children, ...rest }: Props) {
  return (
    <div
      className="flex w-full gap-[14px] py-xl mobile:fixed mobile:bottom-0 mobile:left-0 mobile:bg-white mobile:px-xl"
      {...rest}
    >
      {children}
    </div>
  );
}
