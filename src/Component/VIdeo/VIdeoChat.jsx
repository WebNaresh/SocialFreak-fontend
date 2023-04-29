import { Stack } from "@mui/material";
import React, { useContext } from "react";
import UseContext from "../../State/UseState/UseContext";

const VIdeoChat = () => {
  const { myVideo, userVideo } = useContext(UseContext);

  return (
    <>
      <Stack>
        <Stack height={"100vh"}>
          <video
            src=""
            style={{
              background: "black",
              height: "100%",
            }}
            ref={myVideo}
          ></video>
        </Stack>
        <Stack
          style={{
            position: "absolute",
            right: "30px",
            bottom: "30px",
            width: "10rem",
            height: "10rem",
          }}
        >
          <video
            src=""
            ref={userVideo}
            style={{
              background: "yellow",
              height: "100%",
            }}
          ></video>
        </Stack>
      </Stack>
    </>
  );
};

export default VIdeoChat;
