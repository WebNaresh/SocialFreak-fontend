import { Stack } from "@mui/system";
import React, { useContext, useEffect } from "react";
import { Chip, Typography, Avatar } from "@mui/material";
import UseContext from "../../../../State/UseState/UseContext";
import dayjs from "dayjs";

const ChatUI = () => {
  const { chats, me, oneRef } = useContext(UseContext);
  useEffect(() => {
    oneRef.current.scrollTop = oneRef.current.scrollHeight;

    // eslint-disable-next-line
  }, [chats.length]);

  return (
    <div>
      <Stack marginTop={"2rem"}>
        {chats !== undefined
          ? chats.map((item, i) => {
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
