import { ReactNode } from 'react';

interface CStickyMemoProps {
  children: ReactNode;
}

export default function CStickyMemo({ children }: CStickyMemoProps) {
  return (
    <div className="relative z-[0] h-full w-full">
      <div className="absolute left-4 top-4 z-[-1] h-full w-full bg-black bg-opacity-10" />
      <div className="h-20 w-full bg-primary-y20" />
      <div className="flex w-full flex-col items-center bg-primary-y10 p-24">{children}</div>
    </div>
  );
}
