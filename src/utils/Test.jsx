import React from "react";
import Profile from "../Component/Profile/Profile";
import { Paper, Stack } from "@mui/material";

const VisibilitySensorImage = () => {
  return (
    <Stack
      variant="elevation"
      justifyContent={"center"}
      alignItems={"center"}
      width={"100%"}
      elevation="4"
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          height: "100%",
          background: "#eee",
          overflowY: "scroll",
        }}
      >
        <Profile />
      </Paper>
    </Stack>
  );
};

export default VisibilitySensorImage;
