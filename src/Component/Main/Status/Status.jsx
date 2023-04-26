import {
  Add,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@mui/icons-material";
import { Paper, Stack, Avatar, Typography, Fab } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useRef } from "react";
import UseContext from "../../../State/UseState/UseContext";

const Status = () => {
  const { moments, me } = React.useContext(UseContext);
  const [scrollKar, setScrollKar] = useState(0);
  const scrollFirst = useRef(null);
  const ScrollY = () => {
    // scrollFirst.current.scrollLeft += 120;
    setScrollKar((scrollFirst.current.scrollLeft += 120));
  };
  const ScrollX = () => {
    // scrollFirst.current.scrollLeft -= 120;
    setScrollKar((scrollFirst.current.scrollLeft -= 120));
  };

  const StatusComponent = ({ info }) => {
    return (
      <Paper
        component={"div"}
        sx={{
          height: "150px",
          objectFit: "contain",
          width: "80px",
          background: `url(${info.backgroundPicture}) center no-repeat`,
          backgroundSize: "cover",
          margin: "5px 5px",
          cursor: "pointer",
          ":hover": {
            filter: "opacity(0.7)",
          },
          img: {
            objectFit: "contain",
          },
        }}
      >
        <Stack width={"100px"}></Stack>
        {info.userName === "Add Your Own Stories" ? (
          <>
            <Avatar
              variant="circular"
              alt="no"
              sx={{
                width: "40px",
                height: "40px",
                margin: "auto",
                top: "60px",
                boxShadow: "2px 7px 23px #605c5c",
                transition: "0.3s ease-in-out",
                ":hover": { boxShadow: "2px 3px 20px 8px #181818" },
                background: "#00000070",
              }}
            >
              <Add />
            </Avatar>
            <Typography
              sx={{
                textAlign: "center",
                position: "relative",
                bottom: "-64px",
                fontSize: "11px",
                padding: "4px",
                width: "64px",
                borderRadius: "10px",
                background: "#00000070",
                margin: "0px 4px",
              }}
              variant="body2"
              color="#ffffff"
            >
              Add Your Own Stories
            </Typography>
          </>
        ) : (
          <>
            {" "}
            <div className="story">
              <Avatar
                variant="circular"
                src={info.coverPhoto}
                alt="no"
                sx={{
                  width: "40px",
                  height: "40px",
                  margin: "auto",
                  top: "60px",
                  boxShadow: "2px 7px 23px #605c5c",
                  transition: "0.3s ease-in-out",
                  ":hover": { boxShadow: "2px 3px 20px 8px #181818" },
                }}
              ></Avatar>
              <svg viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="30" />
              </svg>
              <Typography
                sx={{
                  textAlign: "center",
                  position: "relative",
                  bottom: "8px",
                  fontSize: "11px",
                  background: "#00000070",
                  width: "inherit",
                  margin: "0px 10px",
                  borderRadius: "10px",
                }}
                variant="body2"
                color="#ffffff"
              >
                {info.userName}
              </Typography>
            </div>
          </>
        )}
      </Paper>
    );
  };
  return (
    <Stack
      direction={"row"}
      sx={{
        width: "100%",
        height: "170px",
        position: "relative",
      }}
      id="yellow"
    >
      <Stack
        direction={"row"}
        sx={{
          overflowX: "auto",
          width: "100%",
          height: "170px",
          scrollBehavior: "smooth",
        }}
        ref={scrollFirst}
      >
        <Stack position={"absolute"} right={0} top={60}>
          <Fab
            sx={{ opacity: "0.8" }}
            size="small"
            color="primary"
            aria-label="add"
            onClick={ScrollY}
          >
            <KeyboardArrowRight />
          </Fab>
        </Stack>

        {scrollKar <= 0 ? (
          ""
        ) : (
          <Stack position={"absolute"} left={0} top={60}>
            <Fab
              sx={{ opacity: "0.8" }}
              size="small"
              color="primary"
              aria-label="add"
              onClick={ScrollX}
            >
              <KeyboardArrowLeft />
            </Fab>
          </Stack>
        )}
        {moments.map((info, i) => {
          return <StatusComponent key={i} info={info} />;
        })}
        <StatusComponent
          info={{
            coverPhoto: me.profilePicture,
            backgroundPicture: me.backgroundPicture,
            userName: "Add Your Own Stories",
          }}
        />
        {/* <StatusComponent />
      <StatusComponent />
      <StatusComponent />
      <StatusComponent />
      <StatusComponent />
      <StatusComponent />
      <StatusComponent />
      <StatusComponent />
      <StatusComponent />
      <StatusComponent /> */}
      </Stack>
    </Stack>
  );
};

export default Status;
