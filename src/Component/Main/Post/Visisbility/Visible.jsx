import { CardMedia } from "@mui/material";
import React from "react";

const Visible = ({ item }) => {
  return (
    <CardMedia
      src={item}
      image={item}
      sx={{
        height: "24rem",
        display: "flex",
        flexDirection: "row-reverse",
        backgroundColor: "#b0bec5",
      }}
      style={{
        backgroundPosition: "center",
        objectFit: "cover",
        zIndex: "-1",
        backgroundSize: "contain",
      }}
    />
  );
};

export default Visible;
