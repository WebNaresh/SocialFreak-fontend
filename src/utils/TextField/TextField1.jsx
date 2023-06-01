import {
  Avatar,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  InputAdornment,
  Paper,
  TextField,
} from "@mui/material";

import UseContext from "../../State/UseState/UseContext";
import { useState, useContext } from "react";
import { EmojiEmotions, Info, Keyboard, Send } from "@mui/icons-material";
import { Stack } from "@mui/system";

const TextField1 = () => {
  const {
    utils,
    me,
    socket,
    chat,
    setChats,
    TextOrKeyBoard,
    setTextOrKeyBoard,
  } = useContext(UseContext);
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
          <Stack
            justifyContent={"center"}
            alignItems={"center"}
            direction={"column"}
            sx={{
              position: "fixed",
              bottom: "0rem",
              right: "0rem",
              left: "0rem",
              zIndex: 1,
            }}
          >
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
                width: {
                  xs: "100%",
                  sm: "100%",
                  md: "22rem",
                  xl: "22rem",
                },
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
                      cursor: "pointer",
                    }}
                    position="start"
                  >
                    {TextOrKeyBoard ? (
                      <Keyboard
                        onClick={() => setTextOrKeyBoard(false)}
                        sx={{ width: "35px", height: "35px" }}
                      />
                    ) : (
                      <EmojiEmotions
                        onClick={() => setTextOrKeyBoard(true)}
                        sx={{ width: "35px", height: "35px" }}
                      />
                    )}
                  </InputAdornment>
                ),
              }}
            />
            {!TextOrKeyBoard ? (
              <Paper
                sx={{
                  margin: 1,
                  boxSizing: "border-box",
                  height: "40vh",
                  overflowY: "scroll",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {" "}
                <ImageList variant="masonry" cols={4} gap={12}>
                  {itemData.map((item) => (
                    <ImageListItem
                      sx={{
                        height: "130px !important ",
                        width: "130px",
                      }}
                      key={item.img}
                    >
                      <img
                        src={`${item.img}?w=248&fit=crop&auto=format`}
                        srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                        alt={item.title}
                        loading="lazy"
                      />
                      {/* <ImageListItemBar
                        sx={{
                          height: "25px",
                        }}
                        // title={item.title}
                        // subtitle={item.author}
                        // actionIcon={
                        //   <IconButton
                        //     sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                        //     aria-label={`info about ${item.title}`}
                        //   >
                        //     <Info />
                        //   </IconButton>
                        // }
                      /> */}
                    </ImageListItem>
                  ))}
                </ImageList>
              </Paper>
            ) : (
              ""
            )}
          </Stack>
        </>
      )}
    </div>
  );
};

export default TextField1;
const itemData = [
  {
    img: "https://th.bing.com/th/id/OIP.BuYFGy2AEIUJbnPdgPOpzgHaHa?w=175&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7",
    title: "Breakfast",
    author: "@bkristastucchio",
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: "https://th.bing.com/th/id/OIP.BuYFGy2AEIUJbnPdgPOpzgHaHa?w=175&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7",
    title: "Breakfast",
    author: "@bkristastucchio",
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: "https://th.bing.com/th/id/OIP.BuYFGy2AEIUJbnPdgPOpzgHaHa?w=175&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7",
    title: "Breakfast",
    author: "@bkristastucchio",
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: "https://th.bing.com/th/id/OIP.BuYFGy2AEIUJbnPdgPOpzgHaHa?w=175&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7",
    title: "Breakfast",
    author: "@bkristastucchio",
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: "https://th.bing.com/th/id/OIP.BuYFGy2AEIUJbnPdgPOpzgHaHa?w=175&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7",
    title: "Breakfast",
    author: "@bkristastucchio",
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: "https://th.bing.com/th/id/OIP.BuYFGy2AEIUJbnPdgPOpzgHaHa?w=175&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7",
    title: "Breakfast",
    author: "@bkristastucchio",
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: "https://th.bing.com/th/id/OIP.BuYFGy2AEIUJbnPdgPOpzgHaHa?w=175&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7",
    title: "Breakfast",
    author: "@bkristastucchio",
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: "https://th.bing.com/th/id/OIP.BuYFGy2AEIUJbnPdgPOpzgHaHa?w=175&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7",
    title: "Breakfast",
    author: "@bkristastucchio",
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: "https://th.bing.com/th/id/OIP.PRh3ejBwmRjTbSKg2e4dzQHaHa?w=188&h=188&c=7&r=0&o=5&dpr=1.1&pid=1.7",
    title: "Burger",
    author: "@rollelflex_graphy726",
  },
  {
    img: "https://th.bing.com/th/id/OIP.PRh3ejBwmRjTbSKg2e4dzQHaHa?w=188&h=188&c=7&r=0&o=5&dpr=1.1&pid=1.7",
    title: "Camera",
    author: "@helloimnik",
  },
  {
    img: "https://th.bing.com/th/id/OIP.PRh3ejBwmRjTbSKg2e4dzQHaHa?w=188&h=188&c=7&r=0&o=5&dpr=1.1&pid=1.7",
    title: "Coffee",
    author: "@nolanissac",
    cols: 2,
  },
  {
    img: "https://th.bing.com/th/id/OIP.PRh3ejBwmRjTbSKg2e4dzQHaHa?w=188&h=188&c=7&r=0&o=5&dpr=1.1&pid=1.7",
    title: "Hats",
    author: "@hjrc33",
    cols: 2,
  },
  {
    img: "https://th.bing.com/th/id/OIP.PRh3ejBwmRjTbSKg2e4dzQHaHa?w=188&h=188&c=7&r=0&o=5&dpr=1.1&pid=1.7",
    title: "Honey",
    author: "@arwinneil",
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: "https://th.bing.com/th/id/OIP.PRh3ejBwmRjTbSKg2e4dzQHaHa?w=188&h=188&c=7&r=0&o=5&dpr=1.1&pid=1.7",
    title: "Basketball",
    author: "@tjdragotta",
  },
  {
    img: "https://th.bing.com/th/id/OIP.PRh3ejBwmRjTbSKg2e4dzQHaHa?w=188&h=188&c=7&r=0&o=5&dpr=1.1&pid=1.7",
    title: "Fern",
    author: "@katie_wasserman",
  },
  {
    img: "https://th.bing.com/th/id/OIP.PRh3ejBwmRjTbSKg2e4dzQHaHa?w=188&h=188&c=7&r=0&o=5&dpr=1.1&pid=1.7",
    title: "Mushrooms",
    author: "@silverdalex",
    rows: 2,
    cols: 2,
  },
  {
    img: "https://th.bing.com/th/id/OIP.PRh3ejBwmRjTbSKg2e4dzQHaHa?w=188&h=188&c=7&r=0&o=5&dpr=1.1&pid=1.7",
    title: "Tomato basil",
    author: "@shelleypauls",
  },
  {
    img: "https://th.bing.com/th/id/OIP.PRh3ejBwmRjTbSKg2e4dzQHaHa?w=188&h=188&c=7&r=0&o=5&dpr=1.1&pid=1.7",
    title: "Sea star",
    author: "@peterlaster",
  },
  {
    img: "https://th.bing.com/th/id/OIP.PRh3ejBwmRjTbSKg2e4dzQHaHa?w=188&h=188&c=7&r=0&o=5&dpr=1.1&pid=1.7",
    title: "Bike",
    author: "@southside_customs",
    cols: 2,
  },
];
