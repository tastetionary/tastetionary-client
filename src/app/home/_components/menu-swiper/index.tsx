import DefaultButton from '@/components/Button/DefaultButton';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const MenuSwiper = () => {
  return (
    <Swiper
      modules={[Autoplay]}
      spaceBetween={20}
      slidesPerView={4}
      breakpoints={{
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
      }}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      loop={true}
      className="w-full"
    >
      <SwiperSlide>
        <DefaultButton bgColor="gray" customStyle="flex items-center gap-2 py-4 pr-12 pl-8 grow h-120 w-120">
          <span>김치 볶음밥</span>
        </DefaultButton>
      </SwiperSlide>

      <SwiperSlide>
        <DefaultButton bgColor="gray" customStyle="flex items-center gap-2 py-4 pr-12 pl-8 grow h-120 w-120">
          <span>라면</span>
        </DefaultButton>
      </SwiperSlide>

      <SwiperSlide>
        <DefaultButton bgColor="gray" customStyle="flex items-center gap-2 py-4 pr-12 pl-8 grow h-120 w-120">
          <span>만두</span>
        </DefaultButton>
      </SwiperSlide>

      <SwiperSlide>
        <DefaultButton bgColor="gray" customStyle="flex items-center gap-2 py-4 pr-12 pl-8 grow h-120 w-120">
          <span>수제비</span>
        </DefaultButton>
      </SwiperSlide>

      <SwiperSlide>
        <DefaultButton bgColor="gray" customStyle="flex items-center gap-2 py-4 pr-12 pl-8 grow h-120 w-120">
          <span>삼겹살</span>
        </DefaultButton>
      </SwiperSlide>
    </Swiper>
  );
};

export default MenuSwiper;
