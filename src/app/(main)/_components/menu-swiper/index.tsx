import { PickedMenus } from '@/features/home/api';
import DefaultButton from '@/shared/ui/Button/DefaultButton';
import Image from 'next/image';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

/**
 * 루프에 필요한 최소 슬라이드 수.
 *
 * Swiper 의 loop 는 앞뒤로 슬라이드를 복제해 무한 스크롤을 만드는데,
 * 원본이 한 화면에 보이는 개수(최대 slidesPerView = 4)의 2배에 못 미치면
 * 복제할 것이 모자라 루프를 스스로 끄고 콘솔에 경고를 남긴다.
 * `menus` 는 서버에서 받아오는 최근 뽑힌 메뉴라 개수가 유동적이므로 여기서 걸러준다.
 */
const MIN_SLIDES_FOR_LOOP = 8;

const MenuSwiper = ({ menus }: { menus: PickedMenus[] }) => {
  return (
    <Swiper
      modules={[Autoplay]}
      spaceBetween={20}
      slidesPerView={4}
      slidesOffsetBefore={32}
      slidesOffsetAfter={32}
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
      loop={menus.length > MIN_SLIDES_FOR_LOOP}
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
