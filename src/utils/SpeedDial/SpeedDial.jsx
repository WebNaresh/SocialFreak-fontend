import * as React from "react";
import { SpeedDialAction, SpeedDial, Box, Badge, styled } from "@mui/material/";
import {
  AccountCircleOutlined,
  Home,
  MarkChatUnread,
  NavigationOutlined,
  NotificationAdd,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import UseContextAnother from "../../State/UseState/UseContext";
import { Fab } from "@material-ui/core";
import { IconButton } from "@mui/material";

const actions = [
  {
    icon: (
      <Link to={"/notification"}>
        {" "}
        <NotificationAdd />
      </Link>
    ),
    name: "Notification",
  },
];

export default function BasicSpeedDial() {
  const { setBackdrop, utils } = React.useContext(UseContextAnother);

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -10,
      top: -10,
      padding: "0 4px",
      background: "#d32f2f",
      color: "white",
    },
  }));
  return (
    <>
      {utils.cuurentUserIdForMsg === null ? (
        <Box
          sx={{
            flexGrow: 1,
            zIndex: 12500,
            position: "fixed",
            bottom: 60,
            right: 16,
          }}
        >
          <Badge badgeContent={2} color="error">
            <IconButton
              sx={{
                height: "60px",
                width: "60px",
                backgroundColor: "#b0bec5",
                outline: "4px solid",
              }}
              aria-label=""
            >
              <NotificationAdd />
            </IconButton>
          </Badge>
        </Box>
      ) : (
        ""
      )}
    </>
  );
}
