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
  Badge,
  TextField,
  Button,
  Autocomplete,
  Chip,
} from "@mui/material";
import { Edit, Upload } from "@mui/icons-material";
import { useContext } from "react";
import UseContext from "../../State/UseState/UseContext";
import LoginContext from "../../State/Login/LoginContext";

const UpdateProfileCard = React.forwardRef(() => {
  const { me, formData, setFormData } = useContext(UseContext);
  const { updateDataFromBackend, uploadToCloudinary } =
    useContext(LoginContext);
  const top100Films = [];
  const imageref = React.useRef();
  const imageref2 = React.useRef();

  const handlepathWay = (e) => {
    let url = URL.createObjectURL(e.target.files[0]);
    console.log(`🚀 ~ url:`, url);

    setFormData({
      ...formData,
      profileLink: url,
      selectedProfilePic: e.target.files[0],
    });
  };

  const handlepathWay2 = (e) => {
    let url = URL.createObjectURL(e.target.files[0]);
    setFormData({
      ...formData,
      backgroundLink: url,
      selectedBackgroundPic: e.target.files[0],
    });
  };

  // };
  return (
    <div>
      <Card
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "25rem",
          height: "30rem",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          overflow: "auto",
        }}
      >
        <CardMedia
          sx={{ height: "8rem" }}
          image={formData.backgroundLink}
          title={`${me.userName} background pic`}
          style={{
            backgroundPosition: "center",
            backgroundColor: "GrayText",
          }}
        />
        <Paper
          variant="outlined"
          sx={{
            margin: "auto",
            position: "relative",
            left: "40%",
            top: "-7rem",
            display: "flex",
            width: "fit-content",
            backgroundColor: "primary",
          }}
        >
          <IconButton
            aria-label="Edit Profile"
            style={{ borderRadius: "10px" }}
            onClick={() => imageref2.current.click()}
            color={"primary"}
          >
            {" "}
            <Edit color="action" fontSize="1px" />
          </IconButton>
          {/* {formData.selectedBackgroundPic !== null ? (
            <IconButton
              aria-label="Edit Profile"
              style={{ borderRadius: "10px" }}
              onClick={() =>
                uploadToCloudinary(formData.selectedBackgroundPic, "background")
              }
              color={"primary"}
              className={"rotate360"}
            >
              {" "}
              <Upload color="action" fontSize="1px" />
            </IconButton>
          ) : (
            ""
          )} */}
        </Paper>

        <Badge
          badgeContent={
            <>
              <Paper
                variant="outlined"
                sx={{
                  margin: "auto",
                  position: "relative",
                  display: "flex",
                  backgroundColor: "primary",
                }}
              >
                <IconButton
                  aria-label="Edit Profile"
                  style={{ borderRadius: "10px" }}
                  onClick={() => imageref.current.click()}
                  color={"primary"}
                >
                  {" "}
                  <Edit
                    color="action"
                    sx={{
                      fontSize: "1.1875rem",
                    }}
                  />
                </IconButton>
                {/* {formData.selectedProfilePic !== null ? (
                  <IconButton
                    aria-label="Edit Profile"
                    style={{ borderRadius: "10px" }}
                    onClick={() =>
                      uploadToCloudinary(formData.selectedProfilePic, "profile")
                    }
                    color={"primary"}
                    className={"rotate360"}
                  >
                    {" "}
                    <Upload
                      color="action"
                      sx={{
                        fontSize: "1.1875rem",
                      }}
                    />
                  </IconButton>
                ) : (
                  ""
                )} */}
              </Paper>
            </>
          }
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          sx={{
            position: "absolute",
            left: "15%",
            transform: "translate(-50%, -100%)",
            height: "100px",
            background: "transprent",
          }}
        >
          <input
            type="file"
            name="hello"
            id="hello "
            style={{ display: "none" }}
            ref={imageref}
            onChange={handlepathWay}
            accept="image/png, image/jpeg"
          />
          <input
            type="file"
            name="hello"
            id="hello "
            style={{ display: "none" }}
            ref={imageref2}
            onChange={handlepathWay2}
            accept="image/png, image/jpeg"
          />
          <Avatar
            sx={{
              width: "6rem",
              height: "6rem",
              margin: "auto",
              position: "relative",
              left: "15px",
              top: "-15px",
              boxShadow: "2px 7px 23px #605c5c",
            }}
            variant="circular"
            src={formData.profileLink}
            style={{ backgroundPosition: "inherit" }}
            alt="wait"
            title={`${me.userName} profile pic`}
          />{" "}
        </Badge>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            position: "relative",
            bottom: "10px",
            padding: "0px",
            marginTop: "1rem",
          }}
        >
          <Paper variant="outline">
            <Stack flexDirection={"column"}>
              <TextField
                variant="filled"
                id="userName"
                label="UserName"
                sx={{ height: "4rem", width: "18rem" }}
                value={formData.userName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    userName: e.target.value,
                  })
                }
              />
              <Autocomplete
                sx={{ height: "fit-content", width: "18rem" }}
                multiple
                limitTags={2}
                defaultValue={formData.array}
                id="tags-filled"
                options={top100Films.map((option) => option.title)}
                onChange={(event, newValue) => {
                  setFormData({
                    ...formData,
                    array: newValue,
                  });
                }}
                freeSolo
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      variant="outlined"
                      label={option}
                      {...getTagProps({ index })}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="filled"
                    label="Favourites"
                    placeholder={"Favourites"}
                  />
                )}
              />
              {formData.array.length >= 3 ? (
                <Typography
                  variant="body2"
                  textAlign={"center"}
                  color="crimson"
                >
                  We Recomend Use 3 Tags Only
                </Typography>
              ) : (
                <Typography variant="body2" textAlign={"center"} color="green">
                  press enter on writing
                </Typography>
              )}
              <Button
                onClick={() => updateDataFromBackend()}
                sx={{ margin: "1rem auto", width: "5rem" }}
                variant="contained"
                color="primary"
                // disabled={
                //   formData.selectedBackgroundPic === null &&
                //   formData.selectedProfilePic === null
                //     ? false
                //     : true
                // }
              >
                Submit
              </Button>
            </Stack>
          </Paper>
        </CardContent>
      </Card>
    </div>
  );
});

export default UpdateProfileCard;
