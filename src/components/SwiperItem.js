import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";

const images = [
    'https://pbs.twimg.com/media/FufOmIxWIAA_dNm?format=jpg',
    'https://pbs.twimg.com/media/FufOzqzXsAM3eKR?format=jpg',
    'https://pbs.twimg.com/media/FufO8USX0AItfEw?format=jpg',
    'https://pbs.twimg.com/media/FufPGC3XsAMp-HN?format=jpg',
    'https://pbs.twimg.com/media/FufPQN_WcAQBZgw?format=jpg',
    'https://pbs.twimg.com/media/FufPZXnWcAYo04i?format=jpg',
];

export default function SwiperCpnt() {
  return (
    <>
      <Swiper
        slidesPerView={"auto"}
        centeredSlides={true}
        spaceBetween={10}
        loop={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {images.map(image => 
            <SwiperSlide><img src={image} alt="hbd"/></SwiperSlide>
        )}
      </Swiper>
    </>
  );
}
