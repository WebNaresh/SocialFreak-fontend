import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Tab1 from "./Tab1";
import Tab2 from "./Tab2";
import Tab3 from "./Tab3";
import UseContext from "../../../State/UseState/UseContext";
import { useContext } from "react";
import { Stack } from "@mui/system";
import IconButton from "@mui/material/IconButton";
import { ArrowBackIosNew, Send } from "@mui/icons-material";
import {
  Avatar,
  Badge,
  InputAdornment,
  TextField,
  styled,
} from "@mui/material";
import { useState } from "react";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const { utils, oneRef } = useContext(UseContext);

  return (
    <div
      role="tabpanel"
      style={{ height: "100%" }}
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      // style={{ overflowY: "scroll" }}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: "7px 10px 0px 10px", height: "100%" }}>
          <Stack sx={{ height: "100%" }}>{children}</Stack>
        </Box>
      )}
      {utils.chatSpinner === true ? (
        <div class="spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function TabPanel1() {
  const [value, setValue] = React.useState(0);
  const { utils, setUtils, me, setChats, oneRef, socket, userId, chat } =
    useContext(UseContext);

  const [msg, setMsg] = useState("");
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

    socket.current.emit("send-Message", data);

    setChats((chat) => [...chat, data1]);
    chat.current = [...chat.current, data1];

    setMsg("");
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -6,
      top: -6,
      padding: "0 4px",
      background: "#d32f2f",
      color: "white",
    },
  }));

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        position: "relative",
      }}
    >
      <Box
        sx={{
          borderColor: "divider",
          display: "flex",
          justifyContent: "center",
          height: "8%",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          onFocus={() => setValue(0)}
        >
          <Tab
            onClick={() => {
              setUtils((utils) => ({
                ...utils,
                cuurentUserIdForMsg: null,
                chatSpinner: false,
              }));
              userId.current = null;
              setChats([]);
              chat.current = [];
            }}
            label={
              <>
                <StyledBadge
                  badgeContent={utils.messageNotification.length}
                  color="error"
                >
                  Messages
                </StyledBadge>
              </>
            }
            sx={{ fontSize: "12px" }}
            {...a11yProps(0)}
          />
          <Tab
            // disabled={me.userSuggestion?.length === 0 ? true : false}
            label={
              <StyledBadge
                badgeContent={me.userSuggestion?.length}
                color="error"
              >
                Suggestion
              </StyledBadge>
            }
            sx={{ fontSize: "12px" }}
            {...a11yProps(1)}
          />
          <Tab
            // disabled={me.followers?.length === 0 ? true : false}
            label={
              <StyledBadge badgeContent={me.followers?.length} color="error">
                Request
              </StyledBadge>
            }
            sx={{ fontSize: "12px" }}
            {...a11yProps(2)}
          />
        </Tabs>
      </Box>
      <Stack
        // ref={oneRef}
        style={{
          height: "92%",
          position: "absolute",
          width: "100%",
        }}
      >
        <TabPanel value={value} index={0}>
          {utils.cuurentUserIdForMsg !== null ? (
            <Stack
              style={{
                width: "100%",
                height: "40px",
                position: "fixed",
              }}
            >
              <IconButton
                style={{
                  width: "min-content",
                }}
                aria-label="iconClick"
                onClick={() => {
                  setUtils((utils) => ({
                    ...utils,
                    cuurentUserIdForMsg: null,
                    chatSpinner: false,
                  }));
                  userId.current = null;
                  setChats([]);
                  chat.current = [];
                }}
              >
                <ArrowBackIosNew />
              </IconButton>
            </Stack>
          ) : (
            ""
          )}
          <Tab1 />
          {utils.cuurentUserIdForMsg == null ? (
            ""
          ) : (
            <>
              <TextField
                value={msg}
                onChange={(e) => {
                  setMsg(e.currentTarget.value);
                }}
                id="filled-basic1"
                placeholder="Write Message ..."
                variant="filled"
                sx={{
                  position: "fixed",
                  width: "22rem",
                  bottom: "2rem",
                  right: "10px",
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
        </TabPanel>
      </Stack>
      <TabPanel
        style={{
          height: "90%",
          overflowY: "scroll",
        }}
        value={value}
        index={1}
      >
        <Tab2 />
      </TabPanel>
      <TabPanel
        style={{
          height: "90%",
          overflowY: "scroll",
        }}
        value={value}
        index={2}
      >
        <Tab3 />
      </TabPanel>
    </Box>
  );
}
