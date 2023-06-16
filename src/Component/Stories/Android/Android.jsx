import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/swiper-bundle.min.css";
import "./swiper.css";
import { Navigation, Pagination, Zoom } from "swiper";
import { Paper } from "@mui/material";
import CoreStoris from "./Stories/CoreStoris";

import { Stack } from "@mui/system";
import UseContext from "../../../State/UseState/UseContext";

const Android = (prop) => {
  const { me } = useContext(UseContext);
  const [activeIndex, setActiveIndex] = useState(0);

  const [touchStart, setTouchStart] = useState("null");
  const [array, setArray] = useState([]);
  console.log(`🚀 ~ array:`, array);

  const handleSlideChange = (swiper, index) => {
    setActiveIndex(swiper.activeIndex);
    console.log("slide changed");
  };
  const handleContextMenu = (event) => {
    event.preventDefault(); // Prevent the default context menu behavior
  };
  useEffect(() => {
    setArray((copy) => [me.memories]);
    me.following.forEach((element) => {
      if (element.memories && element.memories.length > 0) {
        setArray((copy) => [...copy, element.memories]);
      }
    });
  }, []);

  const intervalIdRef = useRef(0);

  return (
    <>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        onContextMenu={handleContextMenu}
        zoom={true}
        navigation={false}
        pagination={false}
        modules={[Zoom, Navigation, Pagination]}
        className="mySwiper"
        height={"92vh"}
        onSlideChange={handleSlideChange}
      >
        {array.map((_, i) => (
          <SwiperSlide key={i}>
            <CoreStoris
              array={array[i]}
              style={{ height: "100vh", width: "100vw" }}
              imageStyle={{ height: "100%", width: "100%" }}
              activeIndex={activeIndex}
              touchStart={touchStart}
              setTouchStart={setTouchStart}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

// let array = [
//   [
//     {
//       _id: "64843362af2f0f39b8ef6f22",
//       userId: "647f78ac77b731e5860df82b",
//       Message: "Add an Title",
//       Image:
//         "https://res.cloudinary.com/question1/image/upload/v1686385507/social-media-application/nidebabm9hglw3gqyvlt.jpg",
//       localDate: "2023-06-10T08:25:06.819Z",
//       createdAt: "2023-06-10T08:25:06.940Z",
//       updatedAt: "2023-06-10T08:25:06.940Z",
//       __v: 0,
//     },
//     {
//       _id: "64843510af2f0f39b8ef6f53",
//       userId: "647f78ac77b731e5860df82b",
//       Message: "Add an Title",
//       Image:
//         "https://res.cloudinary.com/question1/image/upload/v1686385937/social-media-application/rdiak6yatzn8j6t6ipxo.png",
//       localDate: "2023-06-10T08:32:16.595Z",
//       createdAt: "2023-06-10T08:32:16.701Z",
//       updatedAt: "2023-06-10T08:32:16.701Z",
//       __v: 0,
//     },
//     {
//       _id: "64843510af2f0f39b8ef6f53",
//       userId: "647f78ac77b731e5860df82b",
//       Message: "Add an Title",
//       Image:
//         "https://res.cloudinary.com/question1/image/upload/v1686385937/social-media-application/rdiak6yatzn8j6t6ipxo.png",
//       localDate: "2023-06-10T08:32:16.595Z",
//       createdAt: "2023-06-10T08:32:16.701Z",
//       updatedAt: "2023-06-10T08:32:16.701Z",
//       __v: 0,
//     },
//     {
//       _id: "64843510af2f0f39b8ef6f53",
//       userId: "647f78ac77b731e5860df82b",
//       Message: "Add an Title",
//       Image:
//         "https://res.cloudinary.com/question1/image/upload/v1686385937/social-media-application/rdiak6yatzn8j6t6ipxo.png",
//       localDate: "2023-06-10T08:32:16.595Z",
//       createdAt: "2023-06-10T08:32:16.701Z",
//       updatedAt: "2023-06-10T08:32:16.701Z",
//       __v: 0,
//     },
//   ],
//   [
//     {
//       _id: "64843362af2f0f39b8ef6f22",
//       userId: "647f78ac77b731e5860df82b",
//       Message: "Add an Title",
//       Image:
//         "https://res.cloudinary.com/question1/image/upload/v1686385507/social-media-application/nidebabm9hglw3gqyvlt.jpg",
//       localDate: "2023-06-10T08:25:06.819Z",
//       createdAt: "2023-06-10T08:25:06.940Z",
//       updatedAt: "2023-06-10T08:25:06.940Z",
//       __v: 0,
//     },
//     {
//       _id: "64843510af2f0f39b8ef6f53",
//       userId: "647f78ac77b731e5860df82b",
//       Message: "Add an Title",
//       Image:
//         "https://res.cloudinary.com/question1/image/upload/v1686385937/social-media-application/rdiak6yatzn8j6t6ipxo.png",
//       localDate: "2023-06-10T08:32:16.595Z",
//       createdAt: "2023-06-10T08:32:16.701Z",
//       updatedAt: "2023-06-10T08:32:16.701Z",
//       __v: 0,
//     },
//   ],
//   [
//     {
//       _id: "64843362af2f0f39b8ef6f22",
//       userId: "647f78ac77b731e5860df82b",
//       Message: "Add an Title",
//       Image:
//         "https://res.cloudinary.com/question1/image/upload/v1686385507/social-media-application/nidebabm9hglw3gqyvlt.jpg",
//       localDate: "2023-06-10T08:25:06.819Z",
//       createdAt: "2023-06-10T08:25:06.940Z",
//       updatedAt: "2023-06-10T08:25:06.940Z",
//       __v: 0,
//     },
//     {
//       _id: "64843510af2f0f39b8ef6f53",
//       userId: "647f78ac77b731e5860df82b",
//       Message: "Add an Title",
//       Image:
//         "https://res.cloudinary.com/question1/image/upload/v1686385937/social-media-application/rdiak6yatzn8j6t6ipxo.png",
//       localDate: "2023-06-10T08:32:16.595Z",
//       createdAt: "2023-06-10T08:32:16.701Z",
//       updatedAt: "2023-06-10T08:32:16.701Z",
//       __v: 0,
//     },
//   ],
// ];
export default Android;
