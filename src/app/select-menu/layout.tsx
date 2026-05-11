import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '맛셔너리 | 메뉴 고르기',
  description: '어떤 메뉴를 펼쳐볼까요?',
};

export default function V2SelectMenuLayout({ children }: { children: React.ReactNode }) {
  return children;
}
