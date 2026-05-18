import { Metadata } from 'next';
import MenuIntroPage from './_components/MenuIntroPage';

export const metadata: Metadata = {
  title: '맛셔너리 | 오늘의 메뉴',
  description: '오늘의 메뉴를 펼칠 시간입니다.',
};

export default function Home() {
  return <MenuIntroPage />;
}
