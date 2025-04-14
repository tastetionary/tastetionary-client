'use client';

import banner01 from '@/assets/common/bannel01.jpg';
import banner02 from '@/assets/common/bannel02.jpg';
import banner03 from '@/assets/common/bannel03.jpg';
import banner04 from '@/assets/common/bannel04.jpg';
import banner05 from '@/assets/common/bannel05.jpg';
import Image from 'next/image';

import { useState } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const BannerSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const banners = [
    {
      id: 1,
      src: banner01,
      title: '혹시 어제,\n과음하셨나요?',
      subtitle: '속이 편안해지는 해장 메뉴 추천',
    },
    {
      id: 2,
      src: banner02,
      title: '비 오는 날, \n이런 메뉴 어때요?',
      subtitle: '판교 직장인이 추천하는 비오는 날 맛집',
    },
    {
      id: 3,
      src: banner03,
      title: '스트레스 받을 때에는 \n역시 매운 게 딱이죠.',
      subtitle: '맵고 화끈한 맛으로 장전! 판교 매운맛 리스트',
    },
    {
      id: 4,
      src: banner04,
      title: '간단하게 \n혼밥하고 싶을 때에는.',
      subtitle: '혼자도 부담 없는 혼밥 가능한 판교 맛집 리스트',
    },
    {
      id: 5,
      src: banner05,
      title: '다이어트 중이지만 \n맛있는 건 먹고 싶어.',
      subtitle: '다이어터도 타협 가능한 판교 건강식 맛집',
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
          renderBullet: function (index, className) {
            // 현재 활성화된 슬라이드인지 확인 (activeIndex와 비교)
            const isActive = index === activeIndex;
            // 활성화 상태에 따라 배경색 다르게 설정
            const backgroundColor = isActive ? '#fff' : 'transparent';
            // 테두리는 투명 상태일 때 보이도록 설정
            const border = isActive ? 'none' : '1px solid #fff';

            return `<span class="${className}" 
                style="width: 16px; height: 6px; background-color: ${backgroundColor}; 
                       border: ${border}; border-radius: 0px; opacity: 1; 
                       margin: 0 5px; transition: all 0.3s ease;">
           </span>`;
          },
        }}
        autoplay={{
          // 호진FIXME: 5초정도로 설정
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="w-full"
        onSlideChange={swiper => setActiveIndex(swiper.realIndex)}
      >
        {banners.map(banner => (
          <SwiperSlide key={banner.id} className="overflow-hidden transition-opacity duration-300">
            {/* 여기서 고정 크기의 컨테이너를 생성 */}
            <div className="relative h-[280px] w-[430px] overflow-hidden">
              {/* 배경 이미지 */}
              <div className="absolute inset-0">
                {banner.src && <Image src={banner.src} alt="banner" fill style={{ objectFit: 'cover' }} priority />}
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

      {/* 인디케이터 */}
      <div className="mt-4 flex justify-center gap-2">
        {banners.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-2 rounded-full ${index === activeIndex ? 'bg-white' : 'bg-white opacity-50'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerSlider;
