import { PropsWithChildren } from 'react';
import CHeader from '../c-header';

interface Props {
  title: string;
  isHome?: boolean;
  isLogo: boolean;
}

export default function CServerHeaderWithChildren({ isHome, title, isLogo, children }: PropsWithChildren<Props>) {
  return (
    <>
      <CHeader title={title} isLogo={isLogo} isHome={isHome} />
      {children}
    </>
  );
}
