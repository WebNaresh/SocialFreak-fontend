import {
  Add,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@mui/icons-material";
import {
  Paper,
  Stack,
  Avatar,
  Typography,
  Fab,
  Modal,
  IconButton,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import { useRef } from "react";
import UseContext from "../../../State/UseState/UseContext";
import {
  handleCloseStatus,
  handleOpenStatus,
} from "../../../State/Function/Fuction";
import StatusCreateModal from "../../../AllModal/StatusModal/StatusCreateModal";

const Status = () => {
  const { moments, me, open, setOpen } = React.useContext(UseContext);
  const [scrollKar, setScrollKar] = useState(0);
  const scrollFirst = useRef(null);
  const ScrollY = () => {
    // scrollFirst.current.scrollLeft += 120;
    setScrollKar((scrollFirst.current.scrollLeft += 120));
  };
  const ScrollX = () => {
    // scrollFirst.current.scrollLeft -= 120;
    setScrollKar((scrollFirst.current.scrollLeft -= 120));
  };

  const StatusComponent = ({ info }) => {
    return (
      <Paper
        component={"div"}
        sx={{
          height: "150px",
          objectFit: "contain",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "80px",
          background: `url(${info.Image}) center no-repeat`,
          backgroundSize: "contain",
          margin: "5px 5px",
          cursor: "pointer",
          ":hover": {
            filter: "opacity(0.7)",
          },
          img: {
            objectFit: "contain",
          },
        }}
      >
        {info.userName === "Add Your Own Stories" ? (
          <>
            <IconButton
              onClick={() => handleOpenStatus(setOpen, open)}
              variant="circular"
              alt="no"
              sx={{
                width: "40px",
                height: "40px",
                margin: 2,
                boxShadow: "2px 7px 23px #605c5c",
                transition: "0.3s ease-in-out",
                ":hover": { boxShadow: "2px 3px 20px 8px #181818" },
                background: "#00000070",
              }}
            >
              <Add />
            </IconButton>
            <Typography
              sx={{
                textAlign: "center",
                position: "relative",
                fontSize: "11px",
                padding: "4px",
                width: "64px",
                borderRadius: "10px",
                background: "#00000070",
                margin: "0px 4px",
              }}
              variant="body2"
              color="#ffffff"
            >
              Add Your Own Stories
            </Typography>
          </>
        ) : (
          <>
            {" "}
            <div
              className="story"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Avatar
                  variant="circular"
                  src={info.userId.profilePicture}
                  alt="no"
                  sx={{
                    width: "50px",
                    height: "50px",
                    margin: "auto",
                    boxShadow: "2px 7px 23px #605c5c",
                    transition: "0.3s ease-in-out",
                    ":hover": { boxShadow: "2px 3px 20px 8px #181818" },
                    position: "absolute",
                    left: "0px",
                    right: "0px",
                  }}
                ></Avatar>
                <svg
                  style={{
                    position: "absolute",
                    left: "0px",
                    right: "0px",
                    height: "90px",
                    width: "90px",
                    margin: "auto",
                  }}
                  viewBox="0 0 100 100"
                >
                  <circle cx="50" cy="50" r="30" />
                </svg>
              </div>
              <Typography
                sx={{
                  textAlign: "center",
                  position: "relative",
                  bottom: "-50px",
                  fontSize: "11px",
                  background: "#00000070",
                  width: "inherit",
                  margin: "0px 10px",
                  borderRadius: "10px",
                }}
                variant="body2"
                color="#ffffff"
              >
                {info.userId.userName}
              </Typography>
            </div>
          </>
        )}
      </Paper>
    );
  };
  return (
    <Stack
      direction={"row"}
      sx={{
        width: "100%",
        height: "170px",
        position: "relative",
        paddingTop: "5px",
      }}
      id="yellow"
    >
      <Stack
        direction={"row"}
        sx={{
          overflowX: "auto",
          width: "100%",
          height: "170px",
          scrollBehavior: "smooth",
        }}
        ref={scrollFirst}
      >
        <Stack position={"absolute"} right={0} top={60}>
          <Fab
            sx={{ opacity: "0.8" }}
            size="small"
            color="primary"
            aria-label="add"
            onClick={ScrollY}
          >
            <KeyboardArrowRight />
          </Fab>
        </Stack>

        {scrollKar <= 0 ? (
          ""
        ) : (
          <Stack position={"absolute"} left={0} top={60}>
            <Fab
              sx={{ opacity: "0.8" }}
              size="small"
              color="primary"
              aria-label="add"
              onClick={ScrollX}
            >
              <KeyboardArrowLeft />
            </Fab>
          </Stack>
        )}
        <StatusComponent
          info={{
            coverPhoto: me.profilePicture,
            backgroundPicture: me.profilePicture,
            userName: "Add Your Own Stories",
          }}
        />
        {moments.map((info, i) => {
          return <StatusComponent key={i} info={info} />;
        })}
      </Stack>
      <Modal
        open={open.statusModal}
        onClose={() => handleCloseStatus(setOpen, open)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ zIndex: 2 }}
      >
        <StatusCreateModal />
      </Modal>
    </Stack>
  );
};

export default Status;
