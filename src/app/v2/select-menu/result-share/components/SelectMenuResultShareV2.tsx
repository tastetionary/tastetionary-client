'use client';

import FOOD_NO_RESULT from '@/assets/common/food_no_result.svg';
import IC_LINK from '@/assets/common/Icons/link.svg';
import LOGO_KAKAO from '@/assets/logo/sns/logo_kakao.svg';
import ARROW from '@/assets/common/Icons/arrow.svg';
import BottomButtonContainer from '@/components/Button/BottomButtonContainer';
import RefreshButton from '@/components/Button/RefreshButton';
import CRecommendButton from '@/components/c-recommend-button';
import { FoodCategory, FoodKeyword } from '@/types/enums';
import { copyText } from '@/utils';
import clsx from 'clsx';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface Props {
  category: FoodCategory[];
  keyword: FoodKeyword[];
  id: number;
  name: string;
}

/** Figma: node 4:69856 — 메뉴 결과(공유) 화면 */
export default function SelectMenuResultShareV2({ category: _category, keyword, id, name }: Props) {
  const router = useRouter();

  const handleKakaoShare = () => {
    if (typeof window === 'undefined' || !window.Kakao) return;

    console.log("공유하기!");

    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: '오늘의 점심 메뉴 결재 부탁드립니다',
        description: '직장인 메뉴/식당 추천 서비스 맛셔너리',
        imageUrl: 'https://ifh.cc/g/anywH7.png',
        imageWidth: 800,
        imageHeight: 400,
        link: {
          mobileWebUrl: window.location.href,
          webUrl: window.location.href,
        },
      },
      buttons: [
        {
          title: '웹으로 이동',
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
      ],
    });
  };

  const handleLinkShare = () => {
    if (typeof window === 'undefined') return;

    copyText(window.location.href, '링크가 복사되었습니다');
  };

  // useEffect(() => {
  //   if (!window.Kakao || window.Kakao.isInitialized()) return;

  //   window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_CLIENT_KEY!);
  // }, []);

  const dateLabel = `${dayjs().format('YYYY년 MM월 DD일')} 메뉴`;
  const catchphrase =
    keyword.length > 0 ? `"${keyword.filter(k => k !== '전체').join(' · ')}"` : '';

  const handleBack = () => {
    router.push('/v2/select-menu');
  };

  return (
    <div className="relative min-h-full bg-white">
      <div className="pointer-events-none absolute inset-0 z-0">
        <img
          src="/image/MenuIntro/menu_intro_bg.svg"
          alt=""
          className="h-full min-h-[60vh] w-full object-cover object-top opacity-90"
        />
      </div>

      <header className="fixed inset-x-0 top-0 z-30 mx-auto flex h-56 w-full max-w-500 items-center justify-center bg-white mobile:max-w-full">
        <button
          type="button"
          onClick={handleBack}
          className="absolute left-0 top-0 flex h-56 w-56 items-center justify-center"
          aria-label="뒤로 가기"
        >
          <ARROW width={24} height={24} />
        </button>
        <h1 className="body2 text-center text-16 leading-[1.6] !text-neutral-bg90">메뉴 결과</h1>
        <div className="absolute bottom-0 left-1 right-1 h-4 bg-neutral-bg90" aria-hidden />
      </header>

      <main className="relative z-10 pb-[120px]">
        <p className="text-center leading-[1.6] !text-neutral-bg90 text-20 py-[10px] bg-neutral-bg05">{dateLabel}</p>
        <div className="mx-2 h-4 bg-neutral-bg90" aria-hidden />


        <div className="mt-14 flex justify-center">
          {id > 0 ? (
            <Image src={`/image/Food/food_${id}.svg`} alt="" width={160} height={160} priority />
          ) : (
            <FOOD_NO_RESULT width={160} height={160} aria-hidden />
          )}
        </div>

        <div className="mt-6 flex flex-col">
          <h2 className="text-center text-32 font-bold leading-[1.5] tracking-[0.05em] !text-neutral-bg90">
            {name || '메뉴'}
          </h2>
          {catchphrase && (
            <p className="text-center text-16 leading-[1.6] !text-neutral-bg80">{catchphrase}</p>
          )}
        </div>

        <div className="mx-2 h-4 bg-neutral-bg90 mt-10" aria-hidden />

        <section className="flex flex-col items-center mt-8" aria-labelledby="v2-share-heading">
          <p id="v2-share-heading" className="text-center text-14 leading-[1.6] !text-neutral-bg90">
            [ 이 메뉴로 공유하기 ]
          </p>
          <div className="flex items-center mt-4 gap-4">
            <button
              type="button"
              id="kakao-share-btn"
              className="default-btn flex h-46 w-46 shrink-0 items-center justify-center bg-[#FAE64D] p-12 shadow-negative"
              onClick={handleKakaoShare}
              aria-label="카카오톡으로 공유"
            >
              <LOGO_KAKAO width={20} height={20} />
            </button>
            <button
              type="button"
              className={clsx('default-btn flex h-46 w-46 shrink-0 items-center justify-center bg-white shadow-negative')}
              onClick={handleLinkShare}
              aria-label="링크 복사"
            >
              <IC_LINK width={24} height={24} />
            </button>
          </div>
        </section>

        <div className="mt-[18px] px-32">
          <div
            className="flex h-50 w-full items-center justify-center bg-[#D9D9D9]"
            role="region"
            aria-label="광고 영역"
          >
            <span className="text-14 !text-black opacity-50">광/고/영/역</span>
          </div>
        </div>

      </main>

      <BottomButtonContainer className="z-30 !gap-8 !px-32 !py-24">
        <RefreshButton btnText="조건 재설정" onClick={() => router.push('/v2/select-menu')} />
        <CRecommendButton btnText="한 번 더 고르기" selectType="food" />
      </BottomButtonContainer>
    </div>
  );
}
