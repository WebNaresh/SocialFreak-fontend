import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {
  Check,
  Clear,
  ClearOutlined,
  RemoveDone,
  Send,
  SendTwoTone,
} from "@mui/icons-material";
import { Avatar, Chip, Stack } from "@mui/material";
import { useContext } from "react";
import UseContext from "../../../State/UseState/UseContext";
import { useState } from "react";
import axios from "axios";

export default function ReqDisplay({ data }) {
  const { me, setMe, socket } = useContext(UseContext);
  const handleClick = () => {
    const data1 = {
      addableId: data._id,
      userId: me._id,
    };
    socket.current.emit("userwantofriend", data1);
    let suggestedUser = me.userSuggestion.filter((ele) => ele._id !== data._id);
    setMe({
      ...me,
      userSuggestion: suggestedUser,
      following: [me.following, data],
    });
  };
  const handleClick2 = () => {
    console.log(data._id);

    console.log(me.userSuggestion.filter((ele) => ele === data._id));
    setMe({
      ...me,
      userSuggestion: me.userSuggestion.filter((ele) => ele === data._id),
    });
  };
  const [index, setIndex] = useState(0);
  return (
    <Card
      sx={{
        margin: "5px 0px",
      }}
    >
      {/* <CardActionArea> */}
      <CardContent>
        <Stack direction={"row"}>
          <Stack>
            <Avatar alt="Remy Sharp" src={data.profilePicture} />
          </Stack>
          <Stack sx={{ padding: "0px 15px" }}>
            <Typography variant="body2" color="text.primary">
              {data.userName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {data.friends.forEach((element1) => {
                me.friends.forEach((element) => {
                  if (element1 === element) {
                    return setIndex(index + 1);
                  }
                });
              })}{" "}
              {index > 0
                ? `${index} mutual friends`
                : " 🚀 🚀 Your Choices are simmillar"}
            </Typography>
          </Stack>
        </Stack>
        <Stack direction={"row"}>
          <Chip
            label="Send Request"
            variant="contained"
            icon={
              <SendTwoTone
                color="white"
                fontSize="small"
                sx={{
                  transform: "rotate(-35deg)",
                  paddingLeft: "5px",
                  paddingBottom: "5px",
                }}
              />
            }
            color="primary"
            onClick={handleClick}
            sx={{ margin: "15px 0px" }}
          />
          <Chip
            label="Decline"
            variant="contained"
            icon={<ClearOutlined />}
            color="primary"
            onClick={handleClick2}
            sx={{ margin: "15px 10px" }}
          />
        </Stack>
      </CardContent>
      {/* </CardActionArea> */}
    </Card>
  );
}
