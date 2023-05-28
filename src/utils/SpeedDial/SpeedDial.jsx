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

const actions = [
  {
    icon: (
      <Link to={"/"}>
        {" "}
        <Home />
      </Link>
    ),
    name: "Home",
  },
  {
    icon: (
      <Link to={"/profile"}>
        {" "}
        <AccountCircleOutlined />
      </Link>
    ),
    name: "Profile",
  },
  {
    icon: (
      <Link to={"/messages"}>
        {" "}
        <MarkChatUnread />
      </Link>
    ),
    name: "Chat",
  },
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
          <SpeedDial
            id="speedo"
            ariaLabel="SpeedDial basic example"
            onClick={() => setBackdrop(true)}
            sx={{
              transition: "transform 0.8s ease-out",
              ":hover": {
                "#but": {
                  transform: "rotate(-360deg) ",
                  animation: "none",
                },
              },
            }}
            icon={
              <StyledBadge
                badgeContent={utils.appNotification.length}
                color="primary"
              >
                <NavigationOutlined
                  sx={{
                    transition: "transform 0.8s ease-out",
                  }}
                  id="but"
                  color="action"
                />
              </StyledBadge>
            }
          >
            {actions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                sx={{
                  ":hover": {
                    transform: "rotate(360deg) scale(1.5)",
                  },
                  transition: "transform 0.5s ease-out",
                }}
              />
            ))}
          </SpeedDial>
        </Box>
      ) : (
        ""
      )}
    </>
  );
}
