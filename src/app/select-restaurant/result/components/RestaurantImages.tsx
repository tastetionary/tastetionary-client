import IC_BOOKMARK from '@/assets/common/Icons/bookmark.svg';
import { useSelectResultStore } from '@/store/useSelectResultStore';
import { theme } from '@/styles/theme';
import axios from 'axios';
import { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

interface Props {
  address: string;
}

export default function RestaurantImages({ address }: Props) {
  const [imageUrl, setImageUrl] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const { restaurant } = useSelectResultStore();
  const restaurantName = restaurant?.name;

  useEffect(() => {
    const getImage = async () => {
      const needDistrict = !restaurantName?.includes(' ');
      const district = address?.split(' ')?.[1];

      const res = await axios.get(
        `/search-image-api?query=${needDistrict && district ? `${district} ${restaurantName}` : restaurantName}`,
        {
          headers: {
            'X-Naver-Client-Id': process.env.NEXT_PUBLIC_NAVER_CLIENT_ID,
            'X-Naver-Client-Secret': process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET,
          },
        }
      );

      if (res?.data?.total >= 15) {
        const filtered = res?.data?.items
          .filter(
            (item: { link: string | string[] }) =>
              !item.link.includes('post.phinf.naver.net') && !item.link.includes('.png')
          ) // 필터링
          .slice(0, 3) // 3개만 선택
          .map((item: string) => item.link); // link만 추출

        setImageUrl(filtered);
      } else {
        setImageUrl([]);
      }
    };

    if (restaurantName && restaurantName?.length > 0 && address !== '') {
      getImage();
    }
  }, [restaurant, address]);

  if (imageUrl?.length === 0) return <div className="h-280 w-full bg-neutral-bg10"></div>;

  return (
    <div className="relative flex flex-col items-center">
      <div className="absolute right-[10px] top-[10px] z-2 cursor-pointer rounded-2 bg-[#00000040] p-10">
        <IC_BOOKMARK />
      </div>

      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        spaceBetween={24}
        scrollbar={{ draggable: true }}
        onSlideChange={swiper => setActiveIndex(swiper.realIndex)}
        loop={true}
        autoplay={{
          delay: 3000,
        }}
        style={{ width: '100%' }}
      >
        {imageUrl?.map((p, i) => {
          return (
            <SwiperSlide key={i}>
              <div className=" h-280 w-full bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${p})` }} />
            </SwiperSlide>
          );
        })}
      </Swiper>

      <div className="absolute bottom-lg z-1 flex gap-xs">
        {imageUrl?.map((_, i) => (
          <div
            key={i}
            className="h-4 w-24 bg-neutral-bg20 transition-colors"
            style={activeIndex === i ? { backgroundColor: theme.colors.white } : undefined}
          />
        ))}
      </div>
    </div>
  );
}
