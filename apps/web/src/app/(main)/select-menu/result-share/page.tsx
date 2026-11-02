import { Metadata } from 'next';
import { headers } from 'next/headers';
import SelectMenuResultShare from './components/SelectMenuResultShare';
import { enumKeysToValues } from '@/features/recommendation/components/c-recommend-button/utils';
import { FoodCategory, FoodKeyword } from '@/shared/types/enums';

// 링크를 복사해 붙여넣으면 메신저가 이 페이지의 OG 태그로 미리보기를 만든다.
// 카카오 공유(SelectMenuResultShare 의 sendDefault)와 같은 제목·설명·이미지를 실어 두 경로의 화면을 맞춘다. (QA #11)
const SHARE_TITLE = '오늘의 점심 메뉴 결재 부탁드립니다';
const SHARE_DESCRIPTION = '직장인 메뉴/식당 추천 서비스 맛셔너리';

const SHARE_IMAGE_PATH = '/image/Share/share_og.png';

// OG 이미지는 절대 URL 이어야 하는데, 서비스 도메인이 하나로 고정돼 있지 않다.
// (tastetionary.vercel.app, tastetionary.com, Vercel 프리뷰 등)
// 요청이 들어온 호스트를 기준으로 만들어, 어느 도메인으로 공유하든 같은 도메인의 이미지를 가리키게 한다.
export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const host = headerList.get('x-forwarded-host') ?? headerList.get('host');
  const protocol = headerList.get('x-forwarded-proto') ?? 'https';
  const imageUrl = host ? `${protocol}://${host}${SHARE_IMAGE_PATH}` : SHARE_IMAGE_PATH;

  return {
    title: SHARE_TITLE,
    description: SHARE_DESCRIPTION,
    openGraph: {
      type: 'website',
      siteName: '맛셔너리',
      title: SHARE_TITLE,
      description: SHARE_DESCRIPTION,
      images: [{ url: imageUrl, width: 2400, height: 1200, alt: '맛셔너리 메뉴 품의서' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: SHARE_TITLE,
      description: SHARE_DESCRIPTION,
      images: [imageUrl],
    },
  };
}

export default async function SelectMenuResultSharePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const { category: categoryParam, keyword: keywordParam, id: idParam, name: nameParam } = await searchParams;

  // 공유 URL에는 enum 키(예: 'KOREAN')가 콤마로 구분되어 실린다. 원래 한글 값으로 복원.
  const category = enumKeysToValues(FoodCategory, categoryParam ? categoryParam.split(',') : []);
  const keyword = enumKeysToValues(FoodKeyword, keywordParam ? keywordParam.split(',') : []);
  const id = Number(idParam ?? 0);
  const name = nameParam ?? '';

  return <SelectMenuResultShare category={category} keyword={keyword} id={id} name={name} />;
}
