import * as React from "react";
import {
  Paper,
  Link as MuiLink,
  Typography,
  IconButton,
  Modal,
} from "@mui/material";
import {
  Cake,
  ConnectWithoutContact,
  DownhillSkiing,
  Edit,
  Favorite,
  LocationOn,
  School,
  SentimentSatisfiedAlt,
  SmsFailed,
  Tag,
  Work,
} from "@mui/icons-material";
import Typewriter from "typewriter-effect";
import {
  handleCloseInfo,
  handleOpenInfo,
} from "../../../State/Function/Fuction";
import UpdateProfileInfo from "./Update/UpdateProfileInfo";
import { useContext } from "react";
import UseContext from "../../../State/UseState/UseContext";
import Timestamp from "react-timestamp";

export default function ProfileInfo({ me }) {
  const { setOpen, open } = useContext(UseContext);
  return (
    <Paper sx={{ marginY: 2 }}>
      <Typography
        sx={{ padding: "10px 5px", display: "flex", alignItems: "center" }}
        gutterBottom
        variant="h7"
        component="div"
      >
        <SmsFailed sx={{ marginX: 1 }} fontSize="small" /> Profile Info
        <IconButton
          aria-label="Edit Profile"
          sx={{ borderRadius: "10px" }}
          onClick={() => handleOpenInfo(setOpen, open)}
          style={{
            margin: "auto",
            position: "relative",
            left: "20%",
          }}
        >
          <Edit fontSize="small" />
        </IconButton>
      </Typography>
      <Typography
        display={"flex"}
        flexDirection={"column"}
        margin={2}
        variant="subtitle2"
        color="gray"
      >
        {" "}
        <Typography
          variant="subtitle2"
          color={"black"}
          margin={"2px 0px"}
          display={"flex"}
        >
          <SentimentSatisfiedAlt color="disabled" fontSize="small" /> &nbsp;
          &nbsp;{" "}
          <Typography variant="subtitle2" color="gray">
            {me.nickName}
          </Typography>{" "}
        </Typography>
        <Typography variant="subtitle2" color={"black"} display={"flex"}>
          <Work color="disabled" fontSize="small" /> &nbsp; &nbsp;{" "}
          <Typography variant="subtitle2" color="gray">
            {me.descriptionHighLight === null ? (
              ""
            ) : (
              <Typewriter
                options={{
                  strings: me.descriptionHighLight,
                  autoStart: true,
                  loop: true,
                }}
              />
            )}
          </Typography>{" "}
        </Typography>
        <Typography
          variant="subtitle2"
          color={"black"}
          margin={"2px 0px"}
          display={"flex"}
        >
          <School color="disabled" fontSize="small" /> &nbsp; &nbsp;{" "}
          <Typography variant="subtitle2" color="gray">
            {me.collegeName}
          </Typography>{" "}
        </Typography>
        <Typography
          variant="subtitle2"
          color={"black"}
          margin={"2px 0px"}
          display={"flex"}
        >
          <LocationOn color="disabled" fontSize="small" /> &nbsp; &nbsp;{" "}
          <Typography variant="subtitle2" color="gray">
            {me.location}
          </Typography>{" "}
        </Typography>
        <Typography
          variant="subtitle2"
          color={"black"}
          margin={"2px 0px"}
          display={"flex"}
        >
          {me.relationShip === "single" ? (
            <>
              <Favorite color="disabled" fontSize="small" />
              &nbsp; &nbsp;
              <Typography variant="subtitle2" color="gray">
                Single
              </Typography>
            </>
          ) : me.relationShip === "double" ? (
            <>
              <Favorite color="disabled" fontSize="small" />
              &nbsp; &nbsp;
              <Typography variant="subtitle2" color="gray">
                In Reletion
              </Typography>{" "}
            </>
          ) : (
            <>
              <Favorite color="disabled" fontSize="small" />
              &nbsp; &nbsp;
              <Typography variant="subtitle2" color="gray">
                Secret SuperStar
              </Typography>
            </>
          )}
        </Typography>
        <Typography
          variant="subtitle2"
          color={"black"}
          margin={"2px 0px"}
          display={"flex"}
        >
          <DownhillSkiing color="disabled" fontSize="small" /> &nbsp; &nbsp;{" "}
          <Typography variant="subtitle2" color="gray">
            {me.hobby}
          </Typography>{" "}
        </Typography>
        <Typography
          margin={"2px 0px"}
          variant="subtitle2"
          color={"black"}
          display={"flex"}
        >
          <Cake color="disabled" fontSize="small" /> &nbsp; &nbsp;{" "}
          <Typography variant="subtitle2" color="gray">
            <Timestamp date={me.birthDate} />
            {/* {me.birthDate} */}
          </Typography>{" "}
        </Typography>
        <Typography
          variant="subtitle2"
          margin={"2px 0px"}
          color={"black"}
          display={"flex"}
        >
          <ConnectWithoutContact color="disabled" fontSize="small" /> &nbsp;
          &nbsp;{" "}
          <Typography variant="subtitle2" color="#3999e7">
            {me.taggedPeople !== null
              ? me.taggedPeople.map((e, index) => {
                  return (
                    <MuiLink
                      key={index}
                      href="#"
                      underline="none"
                      color={"#3999e7"}
                    >
                      @{e}
                    </MuiLink>
                  );
                })
              : ""}
          </Typography>{" "}
        </Typography>
        <span
          style={{
            whiteSpace: "pre-line",
            lineHeight: "25px",
            margin: "10px 0px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "12px",
          }}
        ></span>
        <Typography
          variant="subtitle2"
          margin={"2px 0px"}
          color={"black"}
          display={"flex"}
        >
          <Tag
            sx={{ transform: "rotate(115deg)" }}
            color="disabled"
            fontSize="small"
          />{" "}
          &nbsp; &nbsp;{" "}
          <Typography variant="subtitle2" color="#3999e7">
            {me.hashTags !== null
              ? me.hashTags.map((e, index) => {
                  return (
                    <a key={index} href="/" underline="none" color={"#3999e7"}>
                      #{e}
                    </a>
                  );
                })
              : ""}
          </Typography>{" "}
        </Typography>
      </Typography>
      <Modal
        open={open.profileInfo}
        onClose={() => handleCloseInfo(setOpen, open)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <UpdateProfileInfo />
      </Modal>
    </Paper>
  );
}
