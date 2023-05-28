import { Avatar, IconButton, InputAdornment, TextField } from "@mui/material";

import UseContext from "../../State/UseState/UseContext";
import { useState, useContext } from "react";
import { Send } from "@mui/icons-material";

const TextField1 = () => {
  const { utils, me, socket, chat, setChats } = useContext(UseContext);
  const [msg, setMsg] = useState("");

  let handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      // Check for Enter key (keycode 13)
      sendMessage(); // Call your function here
    }
  };
  let sendMessage = () => {
    const data = {
      message: [msg],
      reciever: utils.cuurentUserIdForMsg,
      sender: me,
    };
    const data1 = {
      message: [msg],
      reciever: utils.cuurentUserIdForMsg,
      sender: me,
    };
    console.log(`🚀 ~ data1:`, data1);

    socket.current.emit("send-Message", data);

    setChats((chat) => [...chat, data1]);
    chat.current = [...chat.current, data1];

    setMsg("");
  };
  return (
    <div>
      {utils.cuurentUserIdForMsg == null ? (
        ""
      ) : (
        <>
          <TextField
            autoComplete="off"
            onKeyDown={handleKeyDown}
            value={msg}
            onChange={(e) => {
              setMsg(e.currentTarget.value);
            }}
            id="filled-basic1"
            placeholder="Write Message ..."
            variant="filled"
            sx={{
              position: "fixed",
              width: {
                xs: "100%",
                sm: "100%",
                md: "22rem",
                xl: "22rem",
              },
              bottom: "2rem",
              right: "0px",
              zIndex: 1,
            }}
            InputProps={{
              style: { borderRadius: "100px", margin: "0px 15px" },
              disableUnderline: true,
              endAdornment: (
                <InputAdornment
                  sx={{
                    marginTop: "0px !important",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  position="start"
                >
                  <IconButton
                    disabled={msg.length >= 1 ? false : true}
                    onClick={sendMessage}
                    sx={{ padding: "0px" }}
                  >
                    <Send />
                  </IconButton>
                </InputAdornment>
              ),
              startAdornment: (
                <InputAdornment
                  sx={{
                    marginTop: "0px !important",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  position="start"
                >
                  <Avatar
                    variant="circular"
                    src={me.profilePicture}
                    sx={{ width: "35px", height: "35px" }}
                  />
                </InputAdornment>
              ),
            }}
          />
        </>
      )}
    </div>
  );
};

export default TextField1;
