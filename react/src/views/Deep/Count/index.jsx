import react, { useEffect, useState } from "react";
import "./index.less";
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";
import { Select, Message, Space, Radio } from '@arco-design/web-react';
// 公路客运
import RoadPassenger from "./RoadPassenger/index"



function Index() {
  const [] = useState()
  const Option = Select.Option;
  const options = ['Beijing', 'Shanghai', 'Guangzhou', 'Disabled'];
  const RadioGroup = Radio.Group;
  // document.body.setAttribute('arco-theme', 'dark');

  return (
    <div className="transport-count">

      <Swiper
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        {/* 公路客运 */}
        <SwiperSlide>
          <RoadPassenger></RoadPassenger>
        </SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
      </Swiper>
    </div>
  )
}

export default Index;
