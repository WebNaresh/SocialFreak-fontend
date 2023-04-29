import Alert from "@mui/material/Alert";
import { useContext } from "react";
import UseContext from "../../State/UseState/UseContext";
import Snackbar from "@mui/material/Snackbar";
import { AlertTitle, Button, IconButton, Slide, Stack } from "@mui/material";
import { Call, CallEnd, Close, Phone } from "@mui/icons-material";

export default function CallAlert() {
  const { callAlert, setCallAlert, callInstance, userVideo, myVideo } =
    useContext(UseContext);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return setCallAlert({
        ...callAlert,
        alert: false,
      });
      // setBackdrop(false)
    }
    setCallAlert({
      ...callAlert,
      alert: false,
    });
  };
  function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
  }
  return (
    <>
      {/* <Alert severity="error">This is an error alert — check it out!</Alert>
      <Alert severity="warning">This is a warning alert — check it out!</Alert>
      <Alert severity="info">This is an info alert — check it out!</Alert>
      <Alert severity="success">This is a success alert — check it out!</Alert> */}
      <Snackbar
        TransitionComponent={TransitionLeft}
        open={callAlert.alert}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={callAlert.type}
          sx={{ width: "100%", alignItems: "center" }}
          action={
            <>
              <Stack
                flexDirection={"row"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <IconButton
                  style={{ marginX: "0px 10px" }}
                  color="success"
                  size="medium"
                  onClick={() => {
                    var getUserMedia =
                      navigator.getUserMedia ||
                      navigator.webkitGetUserMedia ||
                      navigator.mozGetUserMedia;

                    getUserMedia(
                      { video: true, audio: true },
                      (mediaStream) => {
                        userVideo.current.srcObject = mediaStream;
                        userVideo.current.play();

                        callInstance.current.answer(mediaStream);

                        callInstance.current.on(
                          "stream",
                          function (remoteStream) {
                            myVideo.current.srcObject = remoteStream;
                            myVideo.current.play();
                          }
                        );
                      }
                    );
                  }}
                >
                  <Call />
                </IconButton>
                <IconButton
                  style={{ marginX: "0px 10px" }}
                  color="warning"
                  size="medium"
                  onClick={() => {
                    callInstance.current.close();
                    handleClose();
                  }}
                >
                  <CallEnd />
                </IconButton>
              </Stack>
            </>
          }
        >
          <AlertTitle>{callAlert.user}</AlertTitle>
          &nbsp; is&nbsp;— &nbsp;<strong> &nbsp;calling You &nbsp;</strong>
        </Alert>
      </Snackbar>
      {/* <Snackbar open={true} autoHideDuration={5000} onClose={handleClose}>
        <Alert
          action={
            <Stack
              flexDirection={"row"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <IconButton
                style={{ marginX: "0px 10px" }}
                color="success"
                size="medium"
              >
                <Call />
              </IconButton>
              <IconButton
                style={{ marginX: "0px 10px" }}
                color="warning"
                size="medium"
              >
                <CallEnd />
              </IconButton>
            </Stack>
          }
          sx={{ width: "100%" }}
          severity="info"
        >
       
          &nbsp; is&nbsp;— &nbsp;<strong> &nbsp;calling You &nbsp;</strong>
        </Alert>
      </Snackbar> */}
    </>
  );
}
