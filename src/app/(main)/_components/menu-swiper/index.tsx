import { PickedMenus } from '@/features/home/api';
import DefaultButton from '@/shared/ui/Button/DefaultButton';
import Image from 'next/image';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const MenuSwiper = ({ menus }: { menus: PickedMenus[] }) => {
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
      className="w-full [&_.swiper-slide]:!w-120 [&_.swiper-wrapper]:pt-2"
    >
      {menus.map(menu => (
        <SwiperSlide key={menu.id}>
          <DefaultButton
            bgColor="gray"
            customStyle="flex items-center gap-[8px] py-4 pr-12 pl-8 grow h-120 w-120 flex-col"
          >
            <Image src={`/image/Food/food_${menu.id || 0}.svg`} alt={'menu-result'} width={64} height={64} />
            <span className="body1">{menu.name}</span>
          </DefaultButton>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MenuSwiper;
