import { Modal, Paper, Stack } from "@mui/material";
import React, { useContext } from "react";
import { handleCloseComment } from "../../State/Function/Fuction";
import UseContext from "../../State/UseState/UseContext";

import CommentModal from "./Post/Comment/CommentModal";
import Post from "./Post/Post";
import Status from "./Status/Status";

const MainScroll = () => {
  const { posts, open, setOpen } = useContext(UseContext);

  return (
    <Stack width={"100%"} margin={"auto"}>
      <Status />

      {posts.map((data, key) => {
        return <Post key={key} data={data} />;
      })}
      <Modal
        open={open.commentModal}
        onClose={() => handleCloseComment(setOpen, open)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper>
          <CommentModal />
        </Paper>
      </Modal>
    </Stack>
  );
};

export default MainScroll;
