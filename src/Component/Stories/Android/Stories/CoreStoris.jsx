import { Card, CardMedia } from "@mui/material";
import { Stack } from "@mui/system";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Media, StoriesC } from "./Child/StoriesC";

const CoreStoris = ({
  array,
  style,
  imageStyle,
  activeIndex,
  touchStart,
  setTouchStart,
}) => {
  let currentIndex = 0;
  const [falseArray, setFalseArray] = useState([]);

  let intervalId;
  const newTRef = useRef();
  const handleContextMenu = (event) => {
    event.preventDefault(); // Prevent the default context menu behavior
  };
  const handleTouchStart = useCallback(() => {
    setTouchStart("start");
  }, []);

  const handleTouchEnd = useCallback(() => {
    setTouchStart("end");
  }, []);

  useEffect(() => {
    const newArray = array.map(() => false);
    setFalseArray(newArray);
  }, [array.length]);
  let updateArray = useCallback((currentIndex) => {
    setFalseArray((prevArray) => {
      const updatedArray = [...prevArray]; // Create a copy of the previous array
      // Update the element at the current index
      console.log(`🚀 ~ currentIndex:`, currentIndex);
      updatedArray[currentIndex] = true;
      if (currentIndex >= array.length) {
        clearInterval(intervalId);
      }

      return updatedArray;
    });
  }, []);

  useEffect(() => {
    currentIndex = 0;

    const newArray = array.map(() => false);
    setFalseArray(newArray);
    intervalId = setInterval(() => {
      updateArray(currentIndex);
      currentIndex++;
    }, 4000);

    return () => {
      clearInterval(intervalId);
    };
  }, [activeIndex]);

  let onRightClick = useCallback(() => {
    // clearInterval(intervalId);
    console.log("rightCLick");
    // setFalseArray((prevArray) => {
    //   const updatedArray = [...prevArray]; // Create a copy of the previous array
    //   // Update the element at the current index
    //   console.log(`🚀 ~ currentIndex:`, currentIndex);
    //   updatedArray[currentIndex] = true;
    //   if (currentIndex >= array.length) {
    //     clearInterval(intervalId);
    //   }

    //   return updatedArray;
    // });
  }, []);

  return (
    <Card style={style}>
      <Stack direction="row" sx={{ height: "0px", touchAction: "none" }}>
        {array.map((e, i) => {
          // Set initial progress to 0
          return (
            <StoriesC
              imageStyle={imageStyle}
              element={e}
              activeIndex={activeIndex}
              i={i}
              key={i}
              falseArray={falseArray[i]}
              touchStart={touchStart}
            />
          );
        })}
      </Stack>
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onContextMenu={handleContextMenu}
        style={{
          position: "relative",
          zIndex: 2,
          background: "black",
          ...imageStyle,
        }}
      >
        <Stack
          // onContextMenu={handleContextMenu}
          sx={{
            position: "absolute",
            left: 0,
            top: 0,
            zIndex: 1,
            height: "100%",
            width: "100%",
            flexDirection: "row",
            display: "flex",
            touchAction: "none",
            // zIndex: 3,
          }}
        >
          {/* left */}
          <Stack
            onClick={() => console.log("hello")}
            height={"100%"}
            width={"50%"}
          ></Stack>
          {/* right */}
          <Stack onClick={onRightClick} height={"100%"} width={"50%"}></Stack>
        </Stack>
        {array.map((e, i) => {
          // Set initial progress to 0
          return (
            <Media
              imageStyle={imageStyle}
              element={e}
              activeIndex={activeIndex}
              i={i}
              key={i}
              falseArray={falseArray[i]}
              touchStart={touchStart}
            />
          );
        })}
      </div>
    </Card>
  );
};

export default CoreStoris;
