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
} from "@mui/material";
import { Edit, Upload } from "@mui/icons-material";
import { useContext } from "react";
import UseContext from "../../State/UseState/UseContext";
import LoginContext from "../../State/Login/LoginContext";
import Carousel from "react-material-ui-carousel";

const CreateModal = React.forwardRef(() => {
  const { me, data, setData, tabData } = useContext(UseContext);
  const { uploadImagesAndSendToServer } = useContext(LoginContext);
  const uploadRef = React.useRef(null);

  const relationBox = [{ label: "hello", id: 1 }];

  // const [upload, setUpload] = useState(null);
  // uploadToCloudinary(e.target.files[0], setUpload)
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
          justifyContent: "center",
          alignItems: "center",
          overflow: "auto",
          display: "flex",
        }}
      >
        <form
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100%",
            height: "100%",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
            display: "flex",
          }}
          hidden
          method="post"
        >
          <Stack
            style={{ width: "95%", margin: "0.5rem", textAlign: "center" }}
          >
            <Typography variant="body2" fontSize={"1rem"} color="GrayText">
              Create Post
            </Typography>
          </Stack>
          <Divider
            variant="fullWidth"
            sx={{ width: "100%" }}
            orientation="horizontal"
          />
          <Stack width={"100%"}>
            <Stack direction={"row"}>
              <Avatar
                variant="circular"
                src={me.profilePicture}
                alt=""
                sx={{ width: "50px", height: "50px", margin: "0.5rem" }}
              />
              <Stack>
                <Typography
                  fontWeight={"550"}
                  variant="body1"
                  margin={"0.5rem 1rem"}
                  fontSize={"15px"}
                >
                  {" "}
                  {me.userName}
                </Typography>
              </Stack>
            </Stack>

            <Carousel
              sx={{
                width: "25rem",
                height: "30rem",
                position: "absolute",
                zIndex: "-1",
                marginTop: "4rem",
                backgroundColor: "#dadada",
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
            <Stack width={"100%"} justifyContent={"center"}>
              <Stack flexDirection="row-reverse" height={"10rem"}>
                <Paper
                  sx={{
                    width: "fit-content",
                    height: "3rem",
                    margin: ".5rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  variant="outlined"
                >
                  <IconButton
                    onClick={() => uploadRef.current.click()}
                    aria-label=""
                    sx={{ height: 40, width: 40 }}
                  >
                    <Edit />
                  </IconButton>
                </Paper>
              </Stack>
              <Stack alignItems={"center"}>
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
                <Autocomplete
                  id="combo-box-demo"
                  options={tabData.tab1}
                  onInputChange={(e1, e) => console.log(e)}
                  freeSolo
                  multiple
                  defaultValue={data.taggedPeopleArray}
                  renderOption={(props, option) => (
                    <Box
                      component="li"
                      sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                      {...props}
                    >
                      <Avatar
                        variant="circular"
                        src={option.profilePicture}
                        alt={option.userName}
                      />
                      <Typography margin={"10px"} variant="body1">
                        {option.userName}
                      </Typography>
                    </Box>
                  )}
                  sx={{
                    margin: "0.5rem 0rem",
                    width: "90%",
                    backgroundColor: "#80808057",
                    input: {
                      color: "white",
                    },
                  }}
                  onChange={(event, newValue) => {
                    console.log(`🚀 ~ newValue:`, newValue);
                    setData({
                      ...data,
                      taggedPeopleArray: [...data.taggedPeopleArray, newValue],
                    });
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="filled"
                      id="userName"
                      label="Tagged People"
                    />
                  )}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        key={index}
                        variant="filled"
                        color="info"
                        label={option.userName}
                        {...getTagProps({ index })}
                      />
                    ))
                  }
                />
                <Autocomplete
                  id="combo-box-demo"
                  options={tabData.tab1}
                  onInputChange={(e1, e) => console.log(e)}
                  defaultValue={data.hashtagArray}
                  renderOption={(props, option) => (
                    <Box
                      component="li"
                      sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                      {...props}
                    >
                      <Avatar
                        variant="circular"
                        src={option.profilePicture}
                        alt={option.userName}
                      />
                      <Typography margin={"10px"} variant="body1">
                        {option.userName}
                      </Typography>
                    </Box>
                  )}
                  sx={{
                    margin: "0.5rem 0rem",
                    width: "90%",
                    backgroundColor: "#80808057",
                    input: {
                      color: "white",
                    },
                  }}
                  freeSolo
                  multiple
                  onChange={(event, newValue) => {
                    setData({
                      ...data,
                      hashtagArray: newValue,
                    });
                  }}
                  color="primary"
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        key={index}
                        variant="filled"
                        color="info"
                        label={option.userName}
                        {...getTagProps({ index })}
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      // color="secondary"
                      variant="filled"
                      id="userName"
                      label="HashTags"
                    />
                  )}
                />
              </Stack>
            </Stack>
          </Stack>

          <input
            onChange={(e) => makeUrl(e.target.files)}
            ref={uploadRef}
            style={{ display: "none" }}
            type="file"
            name="input"
            id="input"
            accept="image/png, image/jpeg"
            multiple
          />

          <CardContent
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              position: "relative",
              width: "100%",
              height: "3rem",
              ":last-child": {
                padding: "0px",
              },
            }}
          >
            <Button
              disabled={!data.handleuploadIcon}
              sx={{
                width: "100%",
                height: "100%",
                borderRadius: "0px 0px 4px 4px",
              }}
              type={"submit"}
              variant="contained"
              color="primary"
              onClick={(e) => {
                e.preventDefault();
                uploadImagesAndSendToServer(data.files);
              }}
            >
              Post
            </Button>
          </CardContent>
        </form>
      </Card>
    </div>
  );
});

export default CreateModal;
