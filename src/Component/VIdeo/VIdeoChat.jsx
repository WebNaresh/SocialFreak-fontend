import { Stack, IconButton } from "@mui/material";
import React, { useContext, useEffect } from "react";
import UseContext from "../../State/UseState/UseContext";
import { Call, CallEnd } from "@mui/icons-material";

const VIdeoChat = () => {
  const {
    myVideo,
    userVideo,
    setStream,
    callInstance,
    redirect,
    socket,
    utils,
  } = useContext(UseContext);
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        if (myVideo.current) {
          myVideo.current.srcObject = stream;
        }
      });
  }, []);

  return (
    <>
      <Stack position={"absolute"}>
        <Stack height={"100vh"}>
          <video
            src=""
            style={{
              background: "black",
              height: "100%",
              width: "99vw",
            }}
            ref={userVideo}
            muted
            autoPlay
          ></video>
        </Stack>
        <Stack
          style={{
            position: "absolute",
            left: "100px",
            bottom: "10px",
            width: "10rem",
            height: "10rem",
          }}
        >
          <IconButton
            aria-label=""
            style={{
              background: "red",
              height: "60px",
              width: "60px",
            }}
            onClick={() => {
              console.log("helo");
              if (callInstance.current !== null) {
                callInstance.current.close();
                callInstance.current = null;
                redirect("/");
              }
              redirect("/");
              socket.current.emit("callEnded", utils.cuurentUserIdForMsg);
            }}
          >
            <CallEnd color="primary" fontSize="large" />
          </IconButton>
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
            ref={myVideo}
            style={{
              background: "yellow",
              height: "100%",
            }}
            muted
            autoPlay
          ></video>
        </Stack>
      </Stack>
    </>
  );
};

export default VIdeoChat;
