import { CardMedia, LinearProgress } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

export const StoriesC = ({ i, falseArray, touchStart }) => {
  const [progress, setProgress] = React.useState(0);
  const timerRef = useRef();
  useEffect(() => {
    if (falseArray) {
      timerRef.current = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100 || touchStart === "start") {
            clearInterval(timerRef.current);

            return prevProgress;
          } else {
            return prevProgress + 10;
          }
        });
      }, 300);
    } else {
      clearInterval(timerRef.current);
      setProgress(0);
    }

    return () => {
      clearInterval(timerRef.current);
    };
  }, [falseArray, touchStart]);

  return (
    <>
      <LinearProgress
        key={i}
        style={{ height: "5px" }}
        variant="determinate"
        value={progress}
        color="info"
        sx={{ flexGrow: 1, margin: "10px 10px", zIndex: 3 }}
      />
    </>
  );
};

export const Media = ({ imageStyle, element, falseArray, i, touchStart }) => {
  const [progress, setProgress] = React.useState(0);
  const timerRef = useRef();
  useEffect(() => {
    if (falseArray) {
      timerRef.current = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100 || touchStart === "start") {
            clearInterval(timerRef.current);
            // if (prevProgress===0) {

            // }
            return prevProgress;
          } else {
            return prevProgress + 10;
          }
        });
      }, 300);
    } else {
      clearInterval(timerRef.current);
      setProgress(0);
    }

    return () => {
      clearInterval(timerRef.current);
    };
  }, [falseArray, touchStart]);
  return (
    <>
      {progress > 0 && progress < 100 ? (
        <CardMedia
          title="title"
          component="img"
          style={imageStyle}
          image={element.Image}
        />
      ) : (
        ""
      )}
    </>
  );
};
