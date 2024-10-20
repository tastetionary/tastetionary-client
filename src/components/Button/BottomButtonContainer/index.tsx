import { HTMLAttributes, ReactNode } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default function BottomButtonContainer({ children, ...rest }: Props) {
  return (
    <div
      className="fixed bottom-0 flex w-[360px] gap-[14px] bg-white px-xl py-xl mobile:left-0 mobile:w-full"
      {...rest}
    >
      {children}
    </div>
  );
}
