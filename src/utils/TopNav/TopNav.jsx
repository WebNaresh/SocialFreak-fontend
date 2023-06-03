import * as React from "react";
import { styled } from "@mui/material/styles";

import {
  AddAPhotoOutlined,
  Chat,
  Home,
  Login,
  Logout,
  Search as SearchIcon,
} from "@mui/icons-material/";

import {
  Button,
  Avatar,
  MenuItem,
  Badge,
  InputBase,
  Typography,
  IconButton,
  Toolbar,
  Box,
  AppBar,
  Menu,
} from "@mui/material/";
import Typewriter from "typewriter-effect";
import CreateModal from "../../AllModal/CreateModal/CreateModal";
import { useContext } from "react";
import UseContext from "../../State/UseState/UseContext";
import TestContext from "../../State/Test/TestContext";
import { Link } from "react-router-dom";
import {
  handleCloseCreate,
  handleOpenCreate,
} from "../../State/Function/Fuction";
import { Modal } from "@material-ui/core";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#eeeeee",
  "&:hover": {
    backgroundColor: "#eeeeee",
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolutge",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "Inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function TopNav() {
  const {
    me,
    setOpen,
    open,
    data,
    setData,
    utils,
    removeCookie,
    setMe,
    setUtils,
    userId,
    setChats,
    chat,
    peerState,
  } = useContext(UseContext);

  const { handleLoader } = useContext(TestContext);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setUtils((utils) => ({
      ...utils,
      cuurentUserIdForMsg: null,
      chatSpinner: false,
    }));
    userId.current = null;
    setChats([]);
    chat.current = [];
  };

  const removeCookieFromBack = () => {
    handleLoader(true, "#E36049", 4000);
    removeCookie("login", { expires: new Date(0) });
    console.log("worked");
    setTimeout(() => {
      setMe({
        backgroundPicture: null,
        birthDate: null,
        collegeName: null,
        descriptionHighLight: null,
        followers: [],
        following: [],
        hashTags: null,
        hobby: null,
        memories: null,
        post: null,
        profilePicture: null,
        relationShip: null,
        taggedPeople: null,
        userEmail: null,
        userName: null,
        location: null,
        nickName: null,
        friends: null,
        userSuggestion: [],
        _id: null,
      });
    }, 3000);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    // handleMobileMenuClose();
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Link to={"/"}>
        <MenuItem
          onClick={handleMenuClose}
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Home sx={{ marginX: 1, fontSize: 25 }} />
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              paddingLeft: "4px",
              alignItems: "center",
            }}
          >
            Home
          </div>{" "}
        </MenuItem>
      </Link>
      <Link to={"/profile"}>
        <MenuItem
          onClick={handleMenuClose}
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          {" "}
          <Avatar
            sx={{ width: 25, height: 25, marginX: 1 }}
            variant="circular"
            src={me.profilePicture}
            alt="wait"
          />{" "}
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              paddingLeft: "4px",
              alignItems: "center",
            }}
          >
            Setting
          </div>{" "}
        </MenuItem>
      </Link>
      <Link to={"/messages"}>
        <MenuItem
          onClick={handleMenuClose}
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Chat sx={{ marginX: 1, fontSize: 25 }} />
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              paddingLeft: "4px",
              alignItems: "center",
            }}
          >
            Chat
          </div>{" "}
        </MenuItem>
      </Link>

      {me?._id === null || undefined ? (
        <Link to={"/login"}>
          {" "}
          <MenuItem
            onClick={handleMenuClose}
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Login sx={{ marginX: 1, fontSize: 25 }}></Login>{" "}
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                paddingLeft: "4px",
                alignItems: "center",
              }}
            >
              Login
            </div>
          </MenuItem>
        </Link>
      ) : (
        <Link onClick={removeCookieFromBack} to={"/login"}>
          <MenuItem
            onClick={handleMenuClose}
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            {" "}
            <Logout sx={{ marginX: 1, fontSize: 25 }}></Logout>{" "}
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                paddingLeft: "4px",
                alignItems: "center",
              }}
            >
              Logout
            </div>
          </MenuItem>
        </Link>
      )}
    </Menu>
  );

  return (
    <Box
      sx={{
        flexGrow: 1,
        height: {
          sm: "8vh",
          md: "9vh",
          xs: "8vh",
          lg: "9vh",
          xl: "9vh",
        },
      }}
    >
      <AppBar
        sx={{
          height: {
            sm: "8vh",
            md: "9vh",
            xs: "8vh",
            lg: "9vh",
            xl: "9vh",
          },
        }}
        position="fixed"
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ width: 120 }}>
            <Typewriter
              options={{
                strings: [
                  "SocialFreak",
                  "SocialMedia",
                  "SocialGroup",
                  "SocialFun",
                ],
                autoStart: true,
                loop: true,
              }}
            />
          </Typography>
          <Search
            sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center" }}
          >
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: "flex" }}>
            <Button
              sx={{
                borderRadius: 5,
                paddingX: 4,
                height: 35,
                margin: "auto",
                display: { xs: "flex", md: "flex" },
              }}
              variant="contained"
              color="secondary"
              startIcon={<AddAPhotoOutlined />}
              onClick={() => {
                handleOpenCreate(setOpen, open);
                setData({
                  ...data,
                  title: "Add an Title",
                  hashtagArray: [],
                  taggedPeopleArray: [],
                  uploadedImages: [],
                  imageArray: [],
                  files: null,
                  buttonDisable: true,
                });
              }}
            >
              {" "}
              Create
            </Button>
            <Modal
              open={open.createModal}
              onClose={() => handleCloseCreate(setOpen, open)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <CreateModal />
            </Modal>

            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              {peerState?._id === null || undefined ? (
                <Badge badgeContent={""} color="info">
                  <Avatar
                    variant="circular"
                    src={me.profilePicture}
                    alt="wait"
                  />
                </Badge>
              ) : (
                <Badge
                  badgeContent={utils.messageNotification.length}
                  color="error"
                >
                  <Avatar
                    variant="circular"
                    src={me.profilePicture}
                    alt="wait"
                  />
                </Badge>
              )}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );
}
