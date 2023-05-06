import { Stack, Paper } from "@mui/material";
import { useRef } from "react";
import { useContext } from "react";
import LoginContext from "../../State/Login/LoginContext";
import UseContext from "../../State/UseState/UseContext";
import Chat from "../Chat/Chat";
import MainScroll from "../Main/MainScroll";
import Profile from "../Profile/Profile";
import InfiniteScroll from "react-infinite-scroll-component";

const Home = () => {
  const { getPosts } = useContext(LoginContext);
  const { posts } = useContext(UseContext);
  const ref11 = useRef();
  const fetchMoreData = () => {
    getPosts();
  };

  return (
    <Stack
      flexDirection={"row"}
      sx={{ background: "#eeeeee" }}
      width={"100vw"}
      height={"88vh"}
    >
      <Stack
        variant="elevation"
        justifyContent={"center"}
        alignItems={"center"}
        width={"30%"}
        elevation="4"
        sx={{
          margin: "8px 8px 0px 8px",
          display: {
            sm: "none",
            md: "none",
            xs: "none",
            lg: "flex",
            xl: "flex",
          },
        }}
      >
        <Paper
          elevation={0}
          sx={{
            width: "100%",
            height: "100%",
            background: "#eee",
            padding: "4px",
            overflowY: "scroll",
          }}
        >
          <Profile />
        </Paper>
      </Stack>
      <Stack
        style={{
          width: {
            sm: "100vw",
            md: "100vw",
            xs: "100vw",
            lg: "40%",
            xl: "40%",
          },
          height: {
            sm: "100vh",
            md: "100vh",
            xs: "100vh",
            lg: "100vh",
            xl: "100vh",
          },
          // padding: "10px",
        }}
      >
        <InfiniteScroll
          dataLength={posts.length}
          next={fetchMoreData}
          hasMore={true}
          height={"88vh"}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <Stack
            ref={ref11}
            variant="elevation"
            justifyContent={"center"}
            alignItems={"center"}
            width={"100%"}
            elevation="4"
          >
            <Stack
              sx={{
                width: "100%",
                height: "100%",
              }}
            >
              <MainScroll />
            </Stack>
          </Stack>
        </InfiniteScroll>
      </Stack>
      <Stack
        variant="elevation"
        justifyContent={"center"}
        alignItems={"center"}
        width={"30%"}
        elevation="4"
        sx={{
          margin: 2,
          height: "84vh",
          padding: "4px",
          display: {
            sm: "none",
            md: "none",
            xs: "none",
            lg: "flex",
            xl: "flex",
          },
        }}
      >
        <Stack
          sx={{
            width: "100%",
            height: "84vh",
          }}
        >
          {" "}
          <Chat />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Home;
