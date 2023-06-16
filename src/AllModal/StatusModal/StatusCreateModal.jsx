import * as React from "react";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Avatar,
  Stack,
  IconButton,
  Paper,
  TextField,
  Button,
  Autocomplete,
  Divider,
  Chip,
  Box,
  CardHeader,
  Menu,
} from "@mui/material";
import { useContext } from "react";
import UseContext from "../../State/UseState/UseContext";
import { Link } from "react-router-dom";
import { Collections, MoreVert } from "@mui/icons-material";
import dayjs from "dayjs";
import { useRef } from "react";
import Carousel from "react-material-ui-carousel";
import LoginContext from "../../State/Login/LoginContext";

const StatusCreateModal = React.forwardRef(() => {
  const { me, data, setData, tabData } = useContext(UseContext);
  const { handleStatus } = useContext(LoginContext);
  const inputRef = useRef(null);
  const makeUrl = (images) => {
    let arrayofImage = [];
    let arrayOfFiles = [];
    for (let i = 0; i < images.length; i++) {
      let url = URL.createObjectURL(images[i]);
      arrayofImage.push(url);
      arrayOfFiles.push(images[i]);
    }
    setData({
      ...data,
      imageArray: arrayofImage,
      files: arrayOfFiles,
      handleuploadIcon: true,
    });
  };

  return (
    <div>
      <Card
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "25rem",
          height: "33rem",
          flexDirection: "column",
          // justifyContent: "center",
          alignItems: "center",
          // overflow: "auto",
          display: "flex",
        }}
      >
        <CardHeader
          sx={{
            width: "100%",
            boxSizing: "border-box",
            padding: 2,
          }}
          avatar={
            <Link to={`/`}>
              <Avatar src={me.profilePicture} aria-label="recipe" />
            </Link>
          }
          title={me.userName}
          action={
            <IconButton onClick={() => inputRef.current.click()}>
              <Collections />
            </IconButton>
          }
        />{" "}
        <Carousel
          sx={{
            width: "25rem",
            height: "100%",
            zIndex: "-1",
            backgroundColor: "#dadada",
            display: "flex",
            alignItems: "center",
          }}
          indicators={false}
        >
          {data.imageArray.map((item, i) => (
            <CardMedia
              key={i}
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
          ))}
        </Carousel>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            position: "relative",
            width: "100%",
            height: "12rem",
            ":last-child": {
              padding: "0px",
            },
          }}
        >
          <TextField
            value={data.title}
            required
            minRows={2}
            onClick={(e) => e.target.select()}
            onChange={(event) => {
              setData({
                ...data,
                title: event.target.value,
              });
            }}
            sx={{
              margin: "0.5rem 0rem",
              width: "90%",
              backgroundColor: "#80808057",
              input: {
                color: "white",
              },
            }}
            id="Title"
            label="text"
            variant="filled"
          />
          <Button
            // disabled={!data.handleuploadIcon}
            sx={{
              width: "100%",
              height: "100%",
              borderRadius: "0px 0px 4px 4px",
            }}
            type={"submit"}
            variant="contained"
            color="primary"
            onClick={(e) => {
              // e.preven?tDefault();
              handleStatus(data.files);
            }}
          >
            Add Status
          </Button>
        </CardContent>
      </Card>
      
      <input
        type="file"
        ref={inputRef}
          multiple
        accept="image/*"
        onChange={(e) => makeUrl(e.target.files)}
      />
    </div>
  );
});

export default StatusCreateModal;
