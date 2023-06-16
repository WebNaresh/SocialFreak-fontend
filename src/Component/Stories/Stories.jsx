import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/swiper-bundle.min.css";

// import required modules
import { EffectCoverflow, EffectCube, Navigation, Pagination } from "swiper";
import Paper from "@mui/material/Paper";
import Windows from "./WIndows/Windows";
import Android from "./Android/Android";
import { useParams } from "react-router-dom";

export default function Stories() {
  let param = useParams();
  console.log(`🚀 ~ param:`, param);
  return <>{window.innerWidth > 900 ? <Windows /> : <Android />}</>;
}
