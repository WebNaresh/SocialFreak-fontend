import React, { useContext } from "react";
import {
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material/";
import { Search } from "@mui/icons-material";
import TabPanel1 from "./Tabs/TabPanel";
import UseContext from "../../State/UseState/UseContext";

const Chat = () => {
  const { TextOrKeyBoard } = useContext(UseContext);
  return (
    <Paper
      sx={{
        height: {
          xs: TextOrKeyBoard ? "92vh" : "50vh",
          sm: TextOrKeyBoard ? "92vh" : "50vh",
          md: TextOrKeyBoard ? "92vh" : "50vh",
          lg: TextOrKeyBoard ? "92vh" : "50vh",
          xl: TextOrKeyBoard ? "92vh" : "50vh",
        },
      }}
    >
      <div style={{ height: "14%" }}>
        <Stack>
          <Typography
            variant="subtitle2"
            padding={"5px 15px"}
            fontStyle={"bold"}
            fontSize={20}
            height={30}
          >
            Messages
          </Typography>
        </Stack>
        <Stack height={50}>
          <TextField
            id="filled-basic1"
            placeholder="Search"
            variant="filled"
            InputProps={{
              style: { borderRadius: "100px", margin: "0px 15px" },
              disableUnderline: true,
              startAdornment: (
                <InputAdornment
                  sx={{
                    marginTop: "0px !important",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  position="start"
                >
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </Stack>
      </div>

      <Stack height={"85%"}>
        <TabPanel1 />
      </Stack>
    </Paper>
  );
};

export default Chat;
