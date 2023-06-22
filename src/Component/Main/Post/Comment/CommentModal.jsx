import * as React from "react";
import {
  Avatar,
  Card,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Chip,
} from "@mui/material";
import UseContext from "../../../../State/UseState/UseContext";
import { useContext } from "react";
import { Stack } from "@mui/system";
import { Send } from "@mui/icons-material";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useState } from "react";
import axios from "axios";
dayjs.extend(relativeTime);

const CommentModal = () => {
  const { me, utils, setUtils, posts, setPosts } = useContext(UseContext);
  const [comment, setComment] = useState("");
  const scrollComment = React.useRef(0);

  const addComment = () => {
    const data = {
      msg: comment,
      userId: me._id,
    };
    const config = { headers: { "Content-Type": "application/json" } };
    axios
      .post(
        `${process.env.REACT_APP_COMMENT_POST}${utils.currentPostId}`,
        data,
        config
      )
      .then((response) => {
        setUtils({
          ...utils,
          commentArray: response.data.comment,
        });
        for (var i = 0; i < posts.length; i++) {
          if (posts[i]._id === utils.currentPostId) {
            posts[i].comments = response.data.comment;
          }
        }
        setPosts(posts);
        setComment("");
        scrollComment.current.scrollTop += scrollComment.current.scrollHeight;
      });
  };

  return (
    <div>
      <Card
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "20rem",
          height: "30rem",
          flexDirection: "column",
          justifyContent: "center",
          overflow: "auto",
          alignItems: "center",
        }}
      >
        <Stack
          height={"26.51rem"}
          id="id"
          sx={{
            overflowY: "scroll",
            scrollBehavior: "smooth",
          }}
          ref={scrollComment}
        >
          {utils.commentArray.map((ele, i) => {
            return (
              <Stack
                key={i}
                padding={".5rem 1rem"}
                flexDirection={"row"}
                alignItems={"center"}
              >
                <Avatar
                  variant="circular"
                  sx={{ objectFit: "contain" }}
                  src={ele.userId.profilePicture}
                />
                <Chip
                  variant="filled"
                  sizes="small"
                  colors="primary"
                  label={ele.comment}
                  sx={{
                    width: "fit-content",
                    height: "25px",
                    margin: "0px 10px",
                    cursor: "pointer",
                  }}
                />

                <Typography variant="body2" fontSize={"10px"} color="primary">
                  {dayjs(ele.createdAt).fromNow()}
                </Typography>
              </Stack>
            );
          })}
        </Stack>

        <TextField
          fullWidth
          color="info"
          id="filled-basic"
          placeholder="Add a comment .."
          variant="filled"
          value={comment}
          onChange={(e) => {
            setComment(e.currentTarget.value);
          }}
          g
          style={{
            position: "sticky",
            bottom: "0rem",

            width: "100%",
            height: "fit-content",
            flexDirection: "column-reverse",
            alignItems: "center",
            overflow: "hidden",
            display: "flex",
          }}
          sx={{ background: "#b0bec5" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Avatar
                  sx={{ height: "30px", width: "30px" }}
                  variant="circular"
                  src={me.profilePicture}
                />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  disabled={comment.length !== 0 ? false : true}
                  onClick={addComment}
                  // onClick={dummy}
                >
                  <Send />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Card>
    </div>
  );
};

export default CommentModal;
