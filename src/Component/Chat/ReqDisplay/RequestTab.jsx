import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {
  Check,
  Clear,
  ClearOutlined,
  Done,
  DoneOutline,
  DoneTwoTone,
  RemoveDone,
  Send,
  SendTwoTone,
} from "@mui/icons-material";
import { Avatar, Chip, Stack } from "@mui/material";
import { useContext } from "react";
import UseContext from "../../../State/UseState/UseContext";
import { useState } from "react";
import axios from "axios";

export default function ReqTab({ data }) {
  const { me, setMe, socket } = useContext(UseContext);
  const handleClick = () => {
    const data1 = {
      addableId: data._id,
      userId: me._id,
    };
    socket.current.emit("userwantofollowback", data1);
    console.log(me.following.filter((ele) => ele._id !== data._id));
    setMe((Copy) => ({
      ...Copy,
      userSuggestion: me.userSuggestion.filter((ele) => ele._id !== data._id),
      following: me.following.filter((ele) => ele._id !== data._id),
    }));
  };
  const handleClick2 = () => {
    console.log(data._id);

    console.log(me.following.filter((ele) => ele === data._id));
    setMe({
      ...me,
      userSuggestion: me.following.filter((ele) => ele === data._id),
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
          </Stack>
        </Stack>
        <Stack direction={"row"}>
          <Chip
            label="Accept Request"
            variant="contained"
            icon={
              <Done
                color="white"
                fontSize="small"
                sx={{
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
