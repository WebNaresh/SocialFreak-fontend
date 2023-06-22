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
import { Stack, Chip, Menu, MenuItem, Button } from "@mui/material";
import { Link as Link1 } from "react-router-dom";

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
import Visible from "./Visisbility/Visible";
// import Visible from "./Visisbility/Visible";

export default function Post({ data }) {
  const { me, open, setOpen, utils, setUtils, posts, setPosts, setMe } =
    React.useContext(UseContext);
  const [like, setLike] = React.useState(false);
  const [state, setstate] = useState(0);
  const [state2, setState2] = useState(false);
  const { requestToView } = useContext(LoginContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open2 = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
        if (response.data?.response === "like") {
          setLike(true);
          setstate(1);
        } else if (response.data?.response === "disLike") {
          setLike(false);
          setstate(-1);
        }
      });
  };

  useEffect(() => {
    if (data?.likes.includes(me._id)) {
      setLike(true);
    }

    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (data?.views.includes(me._id) !== true) {
      requestToView(data?._id);
    }

    // eslint-disable-next-line
  }, [state2 === true]);
  const handleDelete = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_DELETE_POST}${data?._id}`
      );
      if (response.status === 200) {
        const updatedPosts = posts.filter((post) => post._id !== data?._id);
        const newPost = me.post.filter((post) => post._id !== data?._id);
        setMe((copy) => ({ ...copy, post: newPost }));
        setPosts(updatedPosts);

        // Post deleted successfully
        // Perform any necessary actions, such as updating the state or showing a success message
      } else {
        // Handle error if the delete request was not successful
        // Display an error message or perform any necessary error handling
      }
    } catch (error) {
      // Handle error if the delete request failed
      // Display an error message or perform any necessary error handling
    }
    handleClose();
  };

  return (
    <>
      <Card sx={{ maxWidth: "100%", margin: "10px 0px" }}>
        <CardHeader
          avatar={
            <Link1 to={`/${data?.userId?.userName}`} state={data}>
              <Avatar src={data?.userId?.profilePicture} aria-label="recipe" />
            </Link1>
          }
          action={
            <>
              <IconButton
                id="basic-button"
                aria-controls={open2 ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open2 ? "true" : undefined}
                onClick={handleClick}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open2}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                {data?.userId?._id === me._id ? (
                  <MenuItem onClick={handleDelete}>Delete</MenuItem>
                ) : (
                  ""
                )}
                <MenuItem onClick={handleClose}>Report</MenuItem>
              </Menu>
            </>
          }
          title={
            <Link1 to={`/${data?.userId?.userName}`} state={data}>
              {data?.userId?.userName}
            </Link1>
          }
          subheader={
            <Link1 to={`/${data?.userId?.userName}`}>
              {dayjs(data?.createdAt).format("LLL")}
            </Link1>
          }
        />

        <Carousel
          sx={{
            width: "100%",
            height: "24rem",
            backgroundPosition: "center",
            backgroundColor: "#dadada",
          }}
          indicators={false}
          navButtonsAlwaysVisible={data?.image.length > 1}
          navButtonsAlwaysInvisible={data?.image.length <= 1}
        >
          {!data?.views.includes(me._id) ? (
            <>
              {" "}
              {data?.image.map((item, i) => {
                return (
                  <>
                    <VisibilitySensor
                      key={i}
                      onChange={(isVisible) => {
                        setState2(isVisible);
                      }}
                    >
                      <Visible item={item} />
                    </VisibilitySensor>
                  </>
                );
              })}
            </>
          ) : (
            data?.image.map((item, i) => (
              <CardMedia
                key={i}
                src={item}
                image={item}
                sx={{
                  height: "24rem",
                  display: "flex",
                  flexDirection: "row-reverse",
                  backgroundColor: "primary.main",
                }}
                style={{
                  backgroundPosition: "center",
                  objectFit: "cover",
                  zIndex: "-1",
                  backgroundSize: "contain",
                }}
              />
            ))
          )}
        </Carousel>
        <Stack
          position={"relative"}
          display={"flex"}
          flexDirection={"row"}
          top={"-40px"}
          right={"10px"}
          justifyContent={"space-between"}
          height={"0px"}
          zIndex={2}
        >
          {data?.comments.length !== 0 ? (
            <Stack
              padding={".5rem 1rem"}
              flexDirection={"row"}
              alignItems={"center"}
            >
              <Avatar
                variant="circular"
                src={data?.comments[0].userId.profilePicture}
              />
              <Chip
                variant="filled"
                sizes="small"
                colors="primary"
                label={data?.comments[0].comment}
                sx={{
                  width: "fit-content",
                  height: "25px",
                  margin: "0px 10px",
                  cursor: "pointer",
                }}
              />

              <Typography variant="body2" fontSize={"10px"} color="primary">
                {dayjs(data?.comments[0].createdAt).fromNow()}
              </Typography>
            </Stack>
          ) : (
            ""
          )}
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
              {state2 === true && data?.views.includes(me._id) !== true
                ? data?.views.length + 1
                : data?.views.length}
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
              {data?.title}
            </Typography>
          </Stack>
          <Typography
            sx={{
              flexDirection: "row",
              width: "max-content",
            }}
            flexDirection={"row"}
            variant="subtitle2"
            color={"#3999e7"}
            display={"flex"}
          >
            {data?.taggedPeople.map((copy, key) => {
              return (
                <Link1
                  key={key}
                  to={`/${copy?.userName}`}
                  underline="none"
                  color={"#3999e7"}
                >
                  @{copy?.userName}
                </Link1>
              );
            })}
          </Typography>
          <Stack>
            <Typography
              sx={{ cursor: "pointer", flexDirection: "column" }}
              variant="subtitle2"
              color={"#3999e7"}
              display={"flex"}
            >
              {data?.taggedPeople.map((data, i) => {
                return (
                  <Link1
                    to={`/${data?.userName}`}
                    key={i}
                    underline="none"
                    color={"#3999e7"}
                  >
                    #{data?.userName}
                  </Link1>
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
                    handleLikeButton(data?._id, "like");
                    setLike(true);
                  }}
                >
                  <FavoriteIcon color="disabled" />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    fontSize={"8px"}
                  >
                    {data?.likes.length}
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
                    handleLikeButton(data?._id, "disLike");
                    setLike(false);
                  }}
                >
                  <FavoriteIcon color="error" />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    fontSize={"8px"}
                  >
                    {data?.likes.length + state}
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
                onClick={() => {
                  setUtils({
                    ...utils,
                    commentArray: data?.comments,
                    currentPostId: data?._id,
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
            {/* <Stack flexDirection={"column"}>
              {data?.comments.length !== 0 ? (
                <Stack
                  padding={".5rem 1rem"}
                  flexDirection={"row"}
                  alignItems={"center"}
                >
                  <Avatar
                    variant="circular"
                    src={data?.comments[0].userId.profilePicture}
                  />
                  <Chip
                    variant="filled"
                    sizes="small"
                    colors="primary"
                    label={data?.comments[0].comment}
                    sx={{
                      width: "fit-content",
                      height: "25px",
                      margin: "0px 10px",
                      cursor: "pointer",
                    }}
                  />

                  <Typography variant="body2" fontSize={"10px"} color="primary">
                    {dayjs(data?.comments[0].createdAt).fromNow()}
                  </Typography>
                </Stack>
              ) : (
                ""
              )}
            </Stack> */}
          </Stack>
        </CardActions>
      </Card>
    </>
  );
}
