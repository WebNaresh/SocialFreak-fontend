import React, { useContext, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/swiper-bundle.min.css";

import "./style.css";

// import required modules
import { EffectCoverflow, EffectCube, Navigation, Pagination } from "swiper";
import Paper from "@mui/material/Paper";
import { useLocation } from "react-router-dom";
import UseContext from "../../../State/UseState/UseContext";

export default function Windows() {
  let array = [
    { img: "https://swiperjs.com/demos/images/nature-8.jpg" },
    { img: "https://swiperjs.com/demos/images/nature-8.jpg" },
    { img: "https://swiperjs.com/demos/images/nature-8.jpg" },
  ];
  const { me } = useContext(UseContext);
  let location = useLocation();

  return (
    <>
      <div className="swiper-container">
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          initialSlide={location?.state} //change dynamically
          style={{
            height: "100%",
            width: "100%",
          }}
          navigation={true} // Enable navigation buttons
          pagination={true}
          modules={[EffectCoverflow, Pagination, Navigation]}
          className="mySwiper"
        >
          {array.map((v) => {
            return (
              <SwiperSlide
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "30%",
                }}
              >
                <img
                  style={{
                    height: "100%",
                    width: "100%",
                  }}
                  src="https://swiperjs.com/demos/images/nature-1.jpg"
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
}
