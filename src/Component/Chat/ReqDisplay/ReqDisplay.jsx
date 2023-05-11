import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Check, RemoveDone } from "@mui/icons-material";
import { Avatar, Chip, Stack } from "@mui/material";
import { useContext } from "react";
import UseContext from "../../../State/UseState/UseContext";
import { useState } from "react";
import axios from "axios";

export default function ReqDisplay({ data }) {
  const { me, setMe } = useContext(UseContext);
  const handleClick = () => {
    const data1 = {
      addableId: data._id,
    };
    console.log(`🚀 ~ data:`, data1);
    const config = { headers: { "Content-Type": "application/json" } };
    axios
      .post(`${process.env.REACT_APP_GET_FREINDS}${me._id}`, data1, config)
      .catch((errors) => {
        console.log(errors);
      })
      .then((response) => {
        console.log(response);
        setMe({
          ...me,
          friends: response.data.user.friends,
          userSuggestion: response.data.user.userSuggestion,
        });
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
            label="Accept"
            variant="contained"
            icon={<Check />}
            color="primary"
            onClick={handleClick}
            sx={{ margin: "15px 0px" }}
          />
          <Chip
            label="Decline"
            variant="contained"
            icon={<RemoveDone />}
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
