import * as React from "react";
import {
  Card,
  CardContent,
  Stack,
  TextField,
  Button,
  InputAdornment,
  Autocomplete,
  Chip,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  DownhillSkiing,
  Favorite,
  LocationOn,
  School,
} from "@mui/icons-material";
import { useContext } from "react";
import UseContext from "../../State/UseState/UseContext";
import dayjs from "dayjs";
import LoginContext from "../../State/Login/LoginContext";

const UpdateProfileInfo = React.forwardRef(() => {
  const { me } = useContext(UseContext);
  const { updateProfileInfoToBackend } = useContext(LoginContext);
  const top100Films = [];
  const relationBox = ["Single", "In Relation", "Secret Superstar"];
  const [data, setData] = React.useState({
    location: me.location,
    nickName: me.nickName,
    collegeName: me.collegeName,
    relationShip: me.relationShip,
    hobby: me.hobby,
    birthDate: dayjs(me.birthDate),
    taggedPeople: me.taggedPeople,
    hashTags: me.hashTags,
  });
  return (
    <div>
      <Card
        // sx={{ marginBottom: 2 }}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "20rem",
          height: "30rem",
          flexDirection: "column",
          justifyContent: "center",
          overflow: "auto",
          alignItems: "center",
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            position: "relative",
            bottom: "10px",
            padding: "0px",
            marginTop: "2rem",
          }}
        >
          <Stack flexDirection={"column"}>
            <TextField
              variant="outlined"
              id="userName"
              label="College/School Name"
              sx={{ margin: "10px 0px" }}
              value={data.collegeName}
              onChange={(e) =>
                setData({
                  ...data,
                  collegeName: e.target.value,
                })
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <School />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              variant="outlined"
              id="userName"
              label="Location"
              sx={{ margin: "10px 0px" }}
              value={data.location}
              onChange={(e) =>
                setData({
                  ...data,
                  location: e.target.value,
                })
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <LocationOn />
                  </InputAdornment>
                ),
              }}
            />
            <Autocomplete
              id="combo-box-demo"
              options={relationBox}
              defaultValue={relationBox[0]}
              onChange={(event, newValue) => {
                setData({
                  ...data,
                  relationShip: newValue,
                });
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  id="userName"
                  label="Reletionship"
                />
              )}
            />
            {/* <TextField
              variant="outlined"
              id="userName"
              label="Reletionship"
              sx={{ margin: "10px 0px" }}
              value={data.relationShip}
              onChange={(e) =>
                setData({
                  ...data,
                  relationShip: e.target.value,
                })
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <SentimentSatisfiedAlt />
                  </InputAdornment>
                ),
              }}
            /> */}
            <TextField
              variant="outlined"
              id="userName"
              label="NickName"
              sx={{ margin: "10px 0px" }}
              value={data.nickName}
              onChange={(e) =>
                setData({
                  ...data,
                  nickName: e.target.value,
                })
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <Favorite />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              variant="outlined"
              id="userName"
              label="NickName"
              sx={{ margin: "10px 0px" }}
              value={data.nickName}
              onChange={(e) =>
                setData({
                  ...data,
                  nickName: e.target.value,
                })
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <Favorite />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              variant="outlined"
              id="userName"
              label="Hobbie"
              sx={{ margin: "10px 0px" }}
              value={data.hobby}
              onChange={(e) =>
                setData({
                  ...data,
                  hobby: e.target.value,
                })
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <DownhillSkiing />
                  </InputAdornment>
                ),
              }}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  variant="contained"
                  sx={{ borderRadius: "0px" }}
                  label="Basic date picker"
                  format="DD-MM-YYYY"
                  value={data.birthDate}
                  onChange={(newValue) =>
                    setData({
                      ...data,
                      birthDate: newValue,
                    })
                  }
                />
              </DemoContainer>
            </LocalizationProvider>
            <Autocomplete
              sx={{ height: "fit-content", width: "18rem" }}
              multiple
              limitTags={2}
              defaultValue={data.taggedPeople}
              id="tags-filled"
              options={top100Films.map((option) => option.title)}
              onChange={(event, newValue) => {
                setData({
                  ...data,
                  taggedPeople: newValue,
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
                  variant="outlined"
                  label="TaggedPeople"
                  placeholder="TaggedPeople"
                  sx={{ margin: "10px 0px" }}
                />
              )}
            />

            <Autocomplete
              sx={{ height: "fit-content", width: "18rem" }}
              multiple
              limitTags={2}
              defaultValue={data.hashTags}
              id="tags-filled"
              options={top100Films.map((option) => option.title)}
              onChange={(event, newValue) => {
                setData({
                  ...data,
                  hashTags: newValue,
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
                  variant="outlined"
                  label="HashTags"
                  placeholder="HashTags"
                  sx={{ margin: "10px 0px" }}
                />
              )}
            />
            <Button
              style={{ margin: "15PX 0PX" }}
              variant="contained"
              color="primary"
              onClick={() => updateProfileInfoToBackend(data)}
            >
              Submit
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </div>
  );
});

export default UpdateProfileInfo;
