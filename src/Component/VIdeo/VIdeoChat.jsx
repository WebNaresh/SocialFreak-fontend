import { Stack, IconButton } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import UseContext from "../../State/UseState/UseContext";
import { Call, CallEnd, MicNone, MicOff } from "@mui/icons-material";

const VIdeoChat = () => {
  const {
    myVideo,
    userVideo,
    redirect,
    availableConnection,

    setUtils,
    stream,
  } = useContext(UseContext);
  const [mic, setMic] = useState(true);

  return (
    <>
      <Stack zIndex={2} position={"absolute"}>
        <Stack height={"92vh"}>
          <video
            src=""
            style={{
              background: "black",
              height: "100%",
              width: "99vw",
            }}
            ref={userVideo}
            autoPlay
          ></video>
        </Stack>
        <Stack
          style={{
            position: "absolute",
            left: "1rem",
            bottom: "1rem",
            flexDirection: "row",
            justifyContent: "space-around",
            width: "150px",
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
              redirect("/");
              setUtils((utils) => ({ ...utils, cuurentUserIdForMsg: null }));

              if (availableConnection.current !== null) {
                availableConnection.current.close();
                availableConnection.current = null;
              }
              stream.getTracks().forEach((track) => {
                track.stop();
              });
              redirect("/");
            }}
          >
            <CallEnd color="primary" fontSize="large" />
          </IconButton>
          <IconButton
            aria-label=""
            style={{
              background: "red",
              height: "60px",
              width: "60px",
            }}
            onClick={() => {
              if (stream.getAudioTracks()[0].enabled === true) {
                stream.getAudioTracks()[0].enabled = false;
                setMic(false);
              } else {
                stream.getAudioTracks()[0].enabled = true;
                setMic(true);
              }
            }}
          >
            {mic !== true ? (
              <MicNone color="primary" fontSize="large" />
            ) : (
              <MicOff color="primary" fontSize="large" />
            )}
          </IconButton>
        </Stack>

        <Stack
          style={{
            position: "absolute",
            right: "1rem",
            bottom: "1rem",
            width: "10rem",
            height: "10rem",
          }}
        >
          <video
            src=""
            ref={myVideo}
            style={{
              background: "grayText",
              height: "100%",
              objectFit: "cover",
              borderRadius: 10,
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
