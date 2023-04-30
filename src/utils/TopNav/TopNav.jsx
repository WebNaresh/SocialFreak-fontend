import * as React from "react";
import { styled } from "@mui/material/styles";

import {
  Add,
  AddAPhotoOutlined,
  Chat,
  Login,
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
import { useContext } from "react";
import UseContext from "../../State/UseState/UseContext";
import { Link } from "react-router-dom";
import CreateModal from "../../Component/Main/createModal/CreateModal";
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
  const { me, setOpen, open, data, setData } = useContext(UseContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  // const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // const handleMobileMenuClose = () => {
  //   setMobileMoreAnchorEl(null);
  // };

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
      <MenuItem onClick={handleMenuClose}>
        <Link to={"/profile"}>
          {" "}
          <Avatar
            sx={{ width: 30, height: 30, marginRight: 1 }}
            variant="circular"
            src={me.profilePicture}
            alt="wait"
          />{" "}
          Profile{" "}
        </Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Link to={"/messages"}>
          <Chat sx={{ marginX: 1 }} fontSize="small" />
          Chat{" "}
        </Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Link to={"/login"}>
          {" "}
          <Login sx={{ marginX: 1 }} fontSize="small"></Login> Login{" "}
        </Link>
      </MenuItem>
    </Menu>
  );

  // const mobileMenuId = "primary-search-account-menu-mobile";

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
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
              placeholder="Search…"
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
                  hashtagArray: ["example"],
                  taggedPeopleArray: ["example"],
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
              <Badge badgeContent={<Add fontSize="0.9rem" />} color="error">
                <Avatar variant="circular" src={me.profilePicture} alt="wait" />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );
}
