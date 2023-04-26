import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Button, CardMedia } from "@mui/material";

const Carsoul = (props) => {
  var items = [
    {
      name: "Random Name #1",
      link: "https://64.media.tumblr.com/f02b5bd7037c86a9fe164c9fcdb048f2/tumblr_pfkn4soCEq1traf33o8_500.png",
    },
    {
      name: "Random Name #2",
      link: "https://th.bing.com/th/id/OIP.zOX2O0JmhYEDA_VC_iY__QAAAA?pid=ImgDet&rs=1",
    },
  ];

  return (
    <Carousel
      sx={{
        width: "25rem",
        height: "30rem",
        position: "absolute",
        zIndex: "-1",
        marginTop: "4rem",
      }}
      indicators={false}
    >
      {items.map((item, i) => (
        <CardMedia
          key={i}
          src={item.link}
          image={item.link}
          sx={{
            height: "28rem !important",
            width: "100% !important",
            display: "flex",
            flexDirection: "row-reverse",
          }}
          style={{
            backgroundPosition: "center",
            backgroundColor: "#e8e8e8",
            objectFit: "cover",
            zIndex: "-1",
          }}
        />
      ))}
    </Carousel>
  );
};

const Item = (props) => {
  return (
    <Paper>
      <h2>{props.item.name}</h2>
      <p>{props.item.description}</p>

      <Button className="CheckButton">Check it out!</Button>
    </Paper>
  );
};
export default Carsoul;
