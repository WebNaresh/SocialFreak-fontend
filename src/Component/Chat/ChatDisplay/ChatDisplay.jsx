import {
  Avatar,
  Badge,
  Stack,
  ButtonGroup,
  Typography,
  IconButton,
} from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import UseContext from "../../../State/UseState/UseContext";
import LoginContext from "../../../State/Login/LoginContext";
import { useContext } from "react";
import axios from "axios";
import {
  CallOutlined,
  VideoChatOutlined,
  VideocamOffOutlined,
} from "@mui/icons-material";

const ChatDisplay = ({ data }) => {
  const { setUtils, utils, me, setChats, userId, chat, peerInstance, socket } =
    useContext(UseContext);
  const { callVideoCall } = useContext(LoginContext);
  // console.log(utils.onlineUser.get(data._id)?.length > 1);
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#44b700",

      color: "#44b700",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    },
  }));
  const UnStyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#b2b4b1",

      color: "#44b700",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    },
  }));
  const getMessage = () => {
    const data1 = {
      sender: me._id,
      reciever: data._id,
    };
    const config = { headers: { "Content-Type": "application/json" } };
    axios
      .post(process.env.REACT_APP_GET_MESSAGE, data1, config)
      .catch((errors) => {})
      .then((response) => {
        setChats((chats) => [...response.data.messages, ...chats]);
        chat.current = [...chat.current, ...response.data.messages];

        setUtils((utils) => ({
          ...utils,
          chatSpinner: false,
        }));
      });
  };
  return (
    <Stack
      direction={"row"}
      onClick={() => {
        setUtils((utils) => ({
          ...utils,
          cuurentUserIdForMsg: data._id,
          chatSpinner: true,
        }));
        userId.current = data._id;
        getMessage();
      }}
      sx={{
        cursor: "pointer",
        padding: "8px 16px",

        borderRadius: "5px",
        ":hover": {
          background: "#e9e4e4",
        },
        justifyContent: "space-between",
      }}
    >
      <Stack
        sx={{
          width: "46px",
        }}
      >
        {utils.onlineUser.has(data._id) ? (
          <StyledBadge
            overlap="circular"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            sx={{ right: "12px", position: "relative" }}
            variant="dot"
          >
            <Avatar alt="Remy Sharp" src={data.profilePicture} />
          </StyledBadge>
        ) : (
          <UnStyledBadge
            overlap="circular"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            color="primary"
            sx={{ right: "12px", position: "relative" }}
            variant="dot"
          >
            <Avatar alt="Remy Sharp" src={data.profilePicture} />
          </UnStyledBadge>
        )}
      </Stack>
      <Stack>
        <ButtonGroup
          orientation="vertical"
          variant="text"
          color="primary"
          aria-label=""
        >
          <Stack>
            <Typography fontWeight={"550"} variant="body1" fontSize={"13px"}>
              {" "}
              {data.userName}
            </Typography>
          </Stack>
          {/* <Stack>
            {" "}
            <Typography variant="subtitle2" color={"GrayText"}>
              {data.userEmail}
            </Typography>
          </Stack> */}
        </ButtonGroup>
      </Stack>
      <Stack flexDirection={"row"} marginLeft={"15px"}>
        {peerInstance.current?.id !== undefined || null ? (
          <IconButton
            aria-label="VidoChat"
            onClick={() => {
              callVideoCall(data._id);
            }}
          >
            <VideoChatOutlined color="success" />
          </IconButton>
        ) : (
          <IconButton
            aria-label="VidoChat"
            onClick={() => {
              callVideoCall(data._id);
            }}
          >
            <VideocamOffOutlined color="success" />
          </IconButton>
        )}

        <IconButton aria-label="VidoChat" onClick={() => console.log("hello")}>
          <CallOutlined color="success" />
        </IconButton>
      </Stack>
    </Stack>
  );
};

export default ChatDisplay;
