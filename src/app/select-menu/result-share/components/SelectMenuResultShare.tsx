'use client';

import IC_LINK from '@/assets/common/Icons/link.svg';
import LOGO_KAKAO from '@/assets/logo/sns/logo_kakao.svg';
import VERTICAL_LOGO from '@/assets/logo/vertical_logo.svg';
import BottomButtonContainer from '@/components/Button/BottomButtonContainer';
import RefreshButton from '@/components/Button/RefreshButton';
import CHeader from '@/components/c-header';
import CRecommendButton from '@/components/c-recommend-button';
import { copyText } from '@/utils';
import { FoodCategory, FoodKeyword } from '@taehoya/tastetionary/lib/domain/food/food.enum';
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

export default function SelectMenuResultShare({ category, keyword, id, name }: Props) {
  const router = useRouter();

  console.log(category, keyword, id, name);

  const handleKakaoShare = () => {
    if (typeof window === 'undefined' || !window.Kakao) return;

    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: '오늘의 점심 메뉴 결재 부탁드립니다',
        description: '직장인 메뉴/식당 추천 서비스 맛셔너리',
        imageUrl: 'https://ifh.cc/g/anywH7.png',
        imageWidth: 800,
        imageHeight: 400,
        link: {
          // [내 애플리케이션] > [플랫폼] 에서 등록한 사이트 도메인과 일치해야 함
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

  useEffect(() => {
    if (!window.Kakao || window.Kakao.isInitialized()) return;

    window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_CLIENT_KEY);
  }, []);

  return (
    <>
      <CHeader title="메뉴 고르기" isBackBtn />

      <div className="px-lg pb-[120px]">
        <div className="flex flex-col gap-3">
          <div className="mt-xxl flex w-full gap-2.5">
            <div className="flex w-full flex-col justify-between gap-xxs">
              <div className="text-[10vw] leading-[1.6] pc:text-42">메뉴 품의서</div>

              <table className="w-full border-1 border-solid border-neutral-bg90">
                <tbody>
                  <tr>
                    <th className="body1 w-[1%] whitespace-nowrap border-1 border-solid border-neutral-bg90 bg-neutral-bg05 px-19 py-4">
                      작성 일자
                    </th>
                    <td className="body1 px-12 py-4">{dayjs().format('YYYY.M.D')}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <table className="max-w-[22.1%] border-1 border-solid border-neutral-bg90">
              <thead className="min-w-[100px] border-1 border-solid border-neutral-bg90 bg-neutral-bg05">
                <tr>
                  <th className="body1 py-4">담 당</th>
                </tr>
              </thead>
              <tbody className="border-1 border-solid border-neutral-bg90">
                <tr>
                  <td className="px-16 py-24">
                    <VERTICAL_LOGO width="100%" height="100%" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <table className="w-full border-1 border-solid border-neutral-bg90">
            <tbody>
              <tr className="border-1 border-solid border-neutral-bg90 ">
                <th className="body1 w-[1%] content-center whitespace-nowrap border-1 border-solid border-neutral-bg90 bg-neutral-bg05 px-19 py-4">
                  음식 종류
                </th>
                <td className="body1 px-12 py-4">{category.join(', ')}</td>
              </tr>

              <tr>
                <th className="body1 w-[1%] content-center whitespace-nowrap border-1 border-solid border-neutral-bg90 bg-neutral-bg05 px-19 py-4">
                  키워드
                </th>
                <td className="body1 px-12 py-4">{keyword.join(', ')}</td>
              </tr>
            </tbody>
          </table>

          <table className="w-full border-1 border-solid border-neutral-bg90">
            <thead className="border-1 border-solid border-neutral-bg90 bg-neutral-bg05">
              <tr>
                <th className="body1 py-4">내 용</th>
              </tr>
            </thead>
            <tbody className="border-1 border-solid border-neutral-bg90">
              <tr>
                <td className="relative flex flex-col items-center px-16 pb-40 pt-64">
                  <div className="absolute top-5 text-[10vw] leading-[1.6] text-neutral-bg10 pc:text-32">
                    결재 바랍니다
                  </div>
                  <div className="z-1 flex flex-col items-center gap-3">
                    <Image src={`/image/Food/food_${id || 0}.svg`} alt={'menu-result'} width={160} height={160} />

                    <h1 className="text-24 leading-[1.6]">{name || ''}</h1>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-xxl flex flex-col items-center gap-3">
          <div className="body2 text-neutral-bg80">이 메뉴로 공유하기</div>

          <div className="flex gap-[18px]">
            <button
              id="kakao-share-btn"
              className="default-btn w-xxl gap-xs bg-[#fae64d] py-sm"
              onClick={handleKakaoShare}
            >
              <LOGO_KAKAO width={20} height={20} />
            </button>

            <button className={clsx(`default-btn h-48 w-xxl bg-white`)} onClick={handleLinkShare}>
              <IC_LINK width={24} height={24} />
            </button>
          </div>
        </div>
      </div>

      <BottomButtonContainer style={{ zIndex: 1 }}>
        <RefreshButton btnText="조건 재설정" onClick={() => router.push('/select-menu')} />

        <CRecommendButton btnText="한 번 더 돌리기" selectType="food" />
      </BottomButtonContainer>
    </>
  );
}
