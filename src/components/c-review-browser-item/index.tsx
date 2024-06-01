import axios from 'axios';
import { useEffect, useState } from 'react';

interface Props {
  title?: string;
  address?: string;
}

export default function CReviewBrowserItem({ title, address }: Props) {
  const [imageUrl, setImageUrl] = useState<string[]>([]);

  useEffect(() => {
    const getImage = async () => {
      const needDistrict = !title?.includes(' ');
      const district = address?.split(' ')?.[1];

      const res = await axios.get(
        `/search-image-api?query=${needDistrict && district ? `${district} ${title}` : title}&start=1&display=3&sort=sim`,
        {
          headers: {
            'X-Naver-Client-Id': process.env.NEXT_PUBLIC_NAVER_CLIENT_ID,
            'X-Naver-Client-Secret': process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET,
          },
        }
      );

      if (res?.data?.total >= 10) {
        setImageUrl([res?.data?.items?.[0]?.link, res?.data?.items?.[1]?.link]);
      } else {
        setImageUrl([]);
      }
    };

    if (title && title?.length > 0 && address !== '') {
      getImage();
    }
  }, [title, address]);

  return (
    <div className="w-full border-solid border-neutral-bg20 px-20 py-16 [&:not(:last-child)]:border-b-1">
      <div className="flex items-center gap-6">
        <span className="!font-pretendard text-14 font-bold leading-[22.4px]">{title ?? '봉피양 방이점 본관'}</span>
        <span className="!font-pretendard text-12 leading-[19.2px] text-neutral-bg40">한식</span>
      </div>
      <div className="!font-pretendard text-12 leading-[19.2px]">{address ?? '서울 관악구 은천로24길 25(봉천동)'}</div>

      <div className="mt-5 !font-pretendard text-12 leading-[12px]  text-neutral-bg30">
        재방문 의사율 ##% | 평균 ###원 | 리뷰 ##개
      </div>

      <div className="mt-10 flex w-full gap-10">
        {imageUrl?.map((url, i) => (
          <div
            key={i}
            style={{ '--image-url': `url(${url})` } as React.CSSProperties}
            className="h-116 w-full bg-[image:var(--image-url)] bg-cover bg-center bg-no-repeat"
          />
        ))}
      </div>
    </div>
  );
}
