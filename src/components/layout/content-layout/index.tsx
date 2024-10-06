import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function ContentLayout({ children }: Props) {
  return <div className="px-xl pb-[120px]">{children}</div>;
}
