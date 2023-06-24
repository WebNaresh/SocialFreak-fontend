import { Stack } from "@mui/system";
import React, { useContext, useEffect } from "react";
import { Chip, Typography, Avatar, Paper } from "@mui/material";
import UseContext from "../../../../State/UseState/UseContext";
import dayjs from "dayjs";

const ChatUI = () => {
  const { chat, me, oneRef, chats } = useContext(UseContext);
  useEffect(() => {
    oneRef.current.scrollTop += oneRef.current.scrollHeight;

    // eslint-disable-next-line
  }, [chats]);

  return (
    <div style={{ height: "100%" }}>
      <Stack
        sx={{ height: "85%", overflowY: "auto" }}
        ref={oneRef}
        padding={"0rem 0rem 3rem 0rem"}
      >
        {chat.current !== undefined
          ? chat.current.map((item, i) => {
              return (
                <div key={i}>
                  {item.sender._id === me._id ? (
                    <MyChat data={item} />
                  ) : (
                    <UserChat data={item} />
                  )}
                </div>
              );
            })
          : ""}
      </Stack>
    </div>
  );
};
const UserChat = ({ data }) => {
  return (
    <Stack direction={"column"}>
      {data.message.map((string, index) => {
        return (
          <div key={index}>
            <Stack
              padding={".5rem 1rem"}
              flexDirection={"row"}
              alignItems={"center"}
            >
              <Avatar variant="circular" src={data.sender.profilePicture} />
              <Chip
                variant="filled"
                sizes="small"
                colors="primary"
                label={string}
                sx={{
                  width: "fit-content",
                  height: "25px",
                  margin: "0px 10px",
                  cursor: "pointer",
                }}
              />

              <Typography variant="body2" fontSize={"10px"} color="primary">
                {dayjs(data.createdAt).fromNow()}
              </Typography>
            </Stack>
          </div>
        );
      })}
    </Stack>
  );
};

const MyChat = ({ data }) => {
  return (
    <Stack direction={"column"}>
      <>
        {data.message.map((string, index) => {
          return (
            <div key={index}>
              <Stack
                padding={".5rem 1rem"}
                flexDirection={"row-reverse"}
                alignItems={"baseline"}
              >
                <Avatar variant="circular" src={data.sender.profilePicture} />
                <Chip
                  variant="filled"
                  sizes="small"
                  colors="primary"
                  label={string}
                  // component={data.sticker?.length > 0 ? "img" : "div"}
                  sx={{
                    width: "fit-content",
                    height: "25px",
                    margin: "0px 10px",
                    cursor: "pointer",
                  }}
                />
                {/* <Paper
                  sx={{
                    ":hover": {
                      background: `linear-gradient(rgb(196 196 196 / 50%), rgb(196 196 196 / 50%)), url(https://th.bing.com/th/id/OIP.BuYFGy2AEIUJbnPdgPOpzgHaHa?w=175&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7)`,
                      backgroundSize: "contain",
                    },
                    backgroundPosition: "center",
                    padding: "10px",
                    height: "80px",
                    width: "80px",
                    cursor: "pointer",
                    transition: "background-color 0.3s ease",
                    background: `url(https://th.bing.com/th/id/OIP.BuYFGy2AEIUJbnPdgPOpzgHaHa?w=175&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7})`,
                    backgroundClip: "content-box",
                    backgroundSize: "contain",
                  }}
                ></Paper> */}
                <Typography variant="body2" fontSize={"10px"} color="primary">
                  {dayjs(data.createdAt).fromNow()}
                  {/* {data.date} */}
                </Typography>
              </Stack>
            </div>
          );
        })}
      </>
    </Stack>
  );
};

export default ChatUI;
