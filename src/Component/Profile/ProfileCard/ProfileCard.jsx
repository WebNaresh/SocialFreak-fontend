import * as React from "react";
import {
  Typography,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Avatar,
  Stack,
  IconButton,
  Modal,
} from "@mui/material";
import Typewriter from "typewriter-effect";
import { Edit } from "@mui/icons-material";
import { useContext } from "react";
import UseContext from "../../../State/UseState/UseContext";
import {
  handleOpenCard,
  handleCloseCard,
} from "../../../State/Function/Fuction";
import UpdateProfileCard from "../../../AllModal/ProfileCardModal/UpdateProfileCard";

export default function ProfileCard({ me, string }) {
  const { open, setOpen, setFormData, formData } = useContext(UseContext);
  React.useEffect(() => {}, []);
  return (
    <>
      <Card sx={{ marginBottom: 2 }}>
        <CardMedia
          children={null}
          sx={{ height: 100 }}
          image={me?.backgroundPicture !== null ? me?.backgroundPicture : ""}
          src={me?.backgroundPicture !== null ? me?.backgroundPicture : ""}
          title={`${me?.userName} background pic`}
          style={{ backgroundPosition: "center", backgroundColor: "GrayText" }}
          component={"div"}
        />
        <IconButton
          aria-label="Edit Profile"
          style={{ borderRadius: "10px" }}
          onClick={() => {
            handleOpenCard(setOpen, open);
            setFormData({
              ...formData,
              profileLink: me?.profilePicture,
              backgroundLink: me?.backgroundPicture,
              userName: me?.userName,
              array: me?.descriptionHighLight,
              selectedBackgroundPic: null,
              selectedProfilePic: null,
            });
          }}
          sx={{
            margin: "auto",
            position: "relative",
            left: "85%",
            top: "-100px",
            visibility: string !== "other" ? "visible" : "hidden",
          }}
          color={"primary"}
        >
          <Edit fontSize="small" />
        </IconButton>
        <Avatar
          sx={{
            width: 50,
            height: 50,
            margin: "0px 20px",
            position: "relative",
            top: -70,
            boxShadow: "2px 7px 23px #605c5c",
          }}
          variant="circular"
          src={me?.profilePicture}
          style={{ backgroundPosition: "inherit" }}
          alt="wait"
          title={`${me?.userName} profile pic`}
        />{" "}
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            position: "relative",
            bottom: "60px",
            padding: "0px",
          }}
        >
          <Typography gutterBottom variant="h7" component="div">
            {me?.userName}
          </Typography>
          <Stack variant="body2" color="text.secondary">
            {me?.descriptionHighLight === null ? (
              ""
            ) : (
              <Typewriter
                options={{
                  strings: me?.descriptionHighLight,
                  autoStart: true,
                  loop: true,
                }}
              />
            )}
          </Stack>
        </CardContent>
        <CardActions
          sx={{
            borderBottom: "1px solid #e0e0e0",
            borderTop: "1px solid #e0e0e0",
            margin: "10px 10px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Stack>
            <Typography
              fontSize="0.7rem"
              margin={"auto"}
              variant="body2"
              component="div"
            >
              {me?.followers?.length}
            </Typography>
            <Typography
              fontSize="0.7rem"
              margin={"auto"}
              variant="subtitle2"
              color="text.secondary"
            >
              Follower
            </Typography>
          </Stack>
          <Stack
            sx={{
              borderLeft: "1px solid #e0e0e0",
              borderRight: "1px solid #e0e0e0",
              padding: "8px 12px",
            }}
          >
            <Typography
              fontSize="0.7rem"
              margin={"auto"}
              variant="body2"
              component="div"
            >
              {me?.following?.length}
            </Typography>
            <Typography
              margin={"auto"}
              fontSize="0.7rem"
              variant="body2"
              color="text.secondary"
            >
              Following
            </Typography>
          </Stack>
          <Stack>
            <Typography
              fontSize="0.7rem"
              margin={"auto"}
              variant="body2"
              component="div"
            >
              {me?.post?.length}
            </Typography>
            <Typography
              margin={"auto"}
              fontSize="0.7rem"
              variant="body2"
              color="text.secondary"
            >
              Post
            </Typography>
          </Stack>
        </CardActions>
      </Card>
      <Modal
        open={open.profileCard}
        onClose={() => handleCloseCard(setOpen, open)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ zIndex: 2 }}
      >
        <UpdateProfileCard />
      </Modal>
    </>
  );
}
