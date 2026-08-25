import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  title: string;
}

export default function CMypageItem({ title, ...attr }: Props) {
  return (
    <div
      {...attr}
      className="flex cursor-pointer items-center justify-between border-b border-solid border-neutral-bg10 px-32 py-[17px] !font-pretendard text-sm leading-[14px]"
    >
      {title}
    </div>
  );
}
