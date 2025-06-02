'use client';

import { RecentPickedMenu } from '@/apis/home';
import MenuSwiper from '../menu-swiper';

interface Props {
  recentPickedMenu: RecentPickedMenu[];
}

export default function RecommendMenu({ recentPickedMenu }: Props) {
  return (
    <>
      <div className="px-32 pt-48">
        <p className="title4 font-bold">오늘 많이 고른 메뉴 🔥</p>
        <p className="body2 pt-12">사람들이 오늘 가장 많이 고른 메뉴를 확인하세요.</p>
      </div>
      <div className="border-b border-solid border-neutral-bg20 pb-48 pt-24">
        <MenuSwiper recentPickedMenu={recentPickedMenu} />
      </div>
    </>
  );
}
