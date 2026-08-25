'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import banner01 from '@/assets/common/bannel01.jpg';
import banner02 from '@/assets/common/bannel02.jpg';
import banner03 from '@/assets/common/bannel03.jpg';
import banner04 from '@/assets/common/bannel04.jpg';
import banner05 from '@/assets/common/bannel05.jpg';
import 'swiper/css';
import 'swiper/css/pagination';

const BannerSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();

  const banners = [
    {
      id: 1,
      src: banner01,
      title: '혹시 어제,\n과음하셨나요?',
      subtitle: '속이 편안해지는 해장 메뉴 추천',
      url: 'banner01',
    },
    {
      id: 2,
      src: banner02,
      title: '비 오는 날, \n이런 메뉴 어때요?',
      subtitle: '판교 직장인이 추천하는 비오는 날 맛집',
      url: 'banner02',
    },
    {
      id: 3,
      src: banner03,
      title: '스트레스 받을 때에는 \n역시 매운 게 딱이죠.',
      subtitle: '맵고 화끈한 맛으로 장전! 판교 매운맛 리스트',
      url: 'banner03',
    },
    {
      id: 4,
      src: banner04,
      title: '간단하게 \n혼밥하고 싶을 때에는.',
      subtitle: '혼자도 부담 없는 혼밥 가능한 판교 맛집 리스트',
      url: 'banner04',
    },
    {
      id: 5,
      src: banner05,
      title: '다이어트 중이지만 \n맛있는 건 먹고 싶어.',
      subtitle: '다이어터도 타협 가능한 판교 건강식 맛집',
      url: 'banner05',
    },
  ];

  return (
    <div className="max-w-screen-lg mx-auto w-full py-8">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={15}
        slidesPerView={1.2}
        centeredSlides={true}
        pagination={{
          clickable: true,
          bulletClass: 'swiper-pagination-bullet custom-bullet',
          bulletActiveClass: 'swiper-pagination-bullet-active custom-bullet-active',
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="w-full"
        onSlideChange={swiper => setActiveIndex(swiper.realIndex)}
      >
        {banners.map(banner => (
          <SwiperSlide
            key={banner.id}
            className="overflow-hidden transition-opacity duration-300"
            onClick={() => router.push(`/content/${banner.url}`)}
          >
            {/* 여기서 고정 크기의 컨테이너를 생성 */}
            <div className="relative h-[280px] w-[430px] overflow-hidden">
              {/* 배경 이미지 */}
              <div className="absolute inset-0">
                {/* 슬라이드 컨테이너가 430px 고정이라 sizes 를 그대로 알려준다.
                    없으면 Next 가 100vw 로 가정해 필요보다 큰 이미지를 내려받는다. */}
                {banner.src && (
                  <Image src={banner.src} alt="banner" fill sizes="430px" style={{ objectFit: 'cover' }} priority />
                )}
              </div>

              {/* 컨텐츠 */}
              <div className="absolute bottom-0 left-0 z-10 pb-[46px] pl-[32px]">
                <h2 className="body5 mb-2 whitespace-pre-line font-bold text-white">{banner.title}</h2>
                <p className="body6 text-white">{banner.subtitle}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BannerSlider;
