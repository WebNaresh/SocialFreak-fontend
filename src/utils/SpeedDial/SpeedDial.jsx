import * as React from "react";
import { SpeedDialAction, SpeedDial, Box } from "@mui/material/";
import {
  AccountCircleOutlined,
  Home,
  MarkChatUnread,
  NavigationOutlined,
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
      <Link to={"/chat"}>
        {" "}
        <MarkChatUnread />
      </Link>
    ),
    name: "Chat",
  },
];

export default function BasicSpeedDial() {
  const { setBackdrop } = React.useContext(UseContextAnother);
  return (
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
        onMouseEnter={() => setBackdrop(true)}
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
          <NavigationOutlined
            sx={{
              transition: "transform 0.8s ease-out",
            }}
            id="but"
            color="action"
          />
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
  );
}
