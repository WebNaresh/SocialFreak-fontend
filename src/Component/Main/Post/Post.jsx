import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Link, Stack, Chip } from "@mui/material";
import { Comment, VisibilityOutlined } from "@mui/icons-material";
import Carousel from "react-material-ui-carousel";
import dayjs from "dayjs";
import axios from "axios";
import UseContext from "../../../State/UseState/UseContext";
import { useEffect } from "react";
import VisibilitySensor from "react-visibility-sensor";
import { useState } from "react";
import LoginContext from "../../../State/Login/LoginContext";
import { useContext } from "react";
import { handleOpenComment } from "../../../State/Function/Fuction";

export default function Post({ data }) {
  const { me, open, setOpen, utils, setUtils } = React.useContext(UseContext);
  const [like, setLike] = React.useState(false);
  const [state, setstate] = useState(0);
  const [state2, setState2] = useState(false);
  const { requestToView } = useContext(LoginContext);
  const handleLikeButton = (id, response) => {
    const data1 = {
      postId: id,
      response,
    };
    const config = { headers: { "Content-Type": "application/json" } };
    axios
      .post(`${process.env.REACT_APP_LIKE_POST}${me._id}`, data1, config)
      .catch((errors) => {
        // setLike(false);
      })
      .then((response) => {
        if (response.data.response === "like") {
          setLike(true);
          setstate(1);
        } else if (response.data.response === "disLike") {
          setLike(false);
          setstate(-1);
        }
      });
  };
  useEffect(() => {
    if (data.likes.includes(me._id)) {
      setLike(true);
    }

    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (data.views.includes(me._id) !== true) {
      requestToView(data._id);
    }

    // eslint-disable-next-line
  }, [state2 === true]);

  return (
    <>
      <Card sx={{ maxWidth: "100%", margin: "10px 0px" }}>
        <CardHeader
          avatar={
            <Avatar src={data.userId.profilePicture} aria-label="recipe" />
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={data.userId.userName}
          subheader={`${dayjs(data.createdAt).format("LLL")}    `}
        />

        <Carousel
          sx={{
            width: "100%",
            height: "24rem",
            backgroundPosition: "center",
            backgroundColor: "#dadada",
          }}
          indicators={false}
        >
          {data.image.map((item, i) => (
            <VisibilitySensor
              key={i}
              onChange={(isVisible) => {
                setState2(isVisible);
              }}
            >
              <CardMedia
                src={item}
                image={item}
                sx={{
                  height: "24rem",
                  display: "flex",
                  flexDirection: "row-reverse",
                }}
                style={{
                  backgroundPosition: "center",
                  objectFit: "cover",
                  zIndex: "-1",
                }}
              />
            </VisibilitySensor>
          ))}
        </Carousel>
        <Stack
          position={"relative"}
          display={"flex"}
          flexDirection={"row-reverse"}
          top={"-40px"}
          right={"10px"}
          height={"0px"}
          zIndex={2}
        >
          <IconButton
            sx={{
              height: "30px",
              background: "#ffffff80 !important",
            }}
          >
            <Typography
              fontSize={"10px"}
              display={"flex"}
              flexDirection={"column"}
              variant="body1"
              justifyContent={"center"}
              color="textPrimary"
              sx={{
                color: "GrayText",
              }}
            >
              <VisibilityOutlined
                sx={{ fontSize: "17px", position: "relative", top: "5px" }}
                color="disabled"
              />
              {state2 === true && data.views.includes(me._id) !== true
                ? data.views.length + 1
                : data.views.length}
            </Typography>
          </IconButton>
        </Stack>
        <CardContent>
          <Stack flexDirection={"row"}>
            <Typography
              flexDirection={"row"}
              variant="body2"
              color="text.secondary"
              display={"flex"}
            >
              {data.title}
            </Typography>

            {/* <Stack> */}
            <Typography
              sx={{
                flexDirection: "row",
                width: "min-content",
              }}
              variant="subtitle2"
              color={"#3999e7"}
              display={"flex"}
            >
              {data.hashTag.map((data, key) => {
                return (
                  <Link key={key} href="#" underline="none" color={"#3999e7"}>
                    &nbsp; @{data}
                  </Link>
                );
              })}
            </Typography>
            {/* </Stack> */}
          </Stack>
          <Stack>
            <Typography
              sx={{ cursor: "pointer", flexDirection: "column" }}
              variant="subtitle2"
              color={"#3999e7"}
              display={"flex"}
            >
              {data.taggedPeople.map((data, i) => {
                return (
                  <Link href="#" key={i} underline="none" color={"#3999e7"}>
                    #{data}
                  </Link>
                );
              })}
            </Typography>
          </Stack>
        </CardContent>
        <CardActions disableSpacing>
          <Stack width={"100%"}>
            <Stack width={"100%"} flexDirection={"row"}>
              {like === false ? (
                <IconButton
                  aria-label="add to favorites"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "40px",
                  }}
                  onClick={() => {
                    handleLikeButton(data._id, "like");
                    setLike(true);
                  }}
                >
                  <FavoriteIcon color="disabled" />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    fontSize={"8px"}
                  >
                    {data.likes.length}
                  </Typography>
                </IconButton>
              ) : (
                <IconButton
                  aria-label="add to favorites"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "40px",
                  }}
                  onClick={() => {
                    handleLikeButton(data._id, "disLike");
                    setLike(false);
                  }}
                >
                  <FavoriteIcon color="error" />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    fontSize={"8px"}
                  >
                    {data.likes.length + state}
                  </Typography>
                </IconButton>
              )}
              <IconButton
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "40px",
                }}
                aria-label="share"
              >
                <ShareIcon />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontSize={"8px"}
                >
                  Share
                </Typography>
              </IconButton>
              <IconButton
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "fit-content",
                  padding: "4px",
                }}
                aria-label="share"
                onMouseOver={() => {
                  setUtils({
                    ...utils,
                    commentArray: data.comments,
                    currentPostId: data._id,
                  });
                  handleOpenComment(setOpen, open);
                }}
              >
                <Comment />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontSize={"8px"}
                >
                  Comment
                </Typography>
              </IconButton>
            </Stack>
            <Stack flexDirection={"column"}>
              {data.comments.length !== 0 ? (
                <Stack
                  padding={".5rem 1rem"}
                  flexDirection={"row"}
                  alignItems={"center"}
                >
                  <Avatar
                    variant="circular"
                    src={data.comments[0].userId.profilePicture}
                  />
                  <Chip
                    variant="filled"
                    sizes="small"
                    colors="primary"
                    label={data.comments[0].comment}
                    sx={{
                      width: "fit-content",
                      height: "25px",
                      margin: "0px 10px",
                      cursor: "pointer",
                    }}
                  />

                  <Typography variant="body2" fontSize={"10px"} color="primary">
                    {dayjs(data.comments[0].createdAt).fromNow()}
                  </Typography>
                </Stack>
              ) : (
                ""
              )}
            </Stack>
          </Stack>
        </CardActions>
      </Card>
    </>
  );
}

//             <Stack
//               padding={".5rem 1rem"}
//               flexDirection={"row"}
//               alignItems={"center"}
//             >
//               <Avatar
//                 variant="circular"
//                 src={data.comments[1].userId.profilePicture}
//               />
//               <Chip
//                 variant="filled"
//                 sizes="small"
//                 colors="primary"
//                 label={data.comments[1].comment}
//                 sx={{
//                   width: "fit-content",
//                   height: "25px",
//                   margin: "0px 10px",
//                   cursor: "pointer",
//                 }}
//               />

//               <Typography variant="body2" fontSize={"10px"} color="primary">
//                 {dayjs(data.comments[1].createdAt).fromNow()}
//               </Typography>
//             </Stack>
