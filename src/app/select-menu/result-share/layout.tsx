import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '맛셔너리 | 메뉴 결과',
  description: '추첨한 메뉴를 공유해 보세요.',
};

export default function V2SelectMenuResultShareLayout({ children }: { children: React.ReactNode }) {
  return children;
}
