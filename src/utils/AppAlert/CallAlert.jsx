import Alert from "@mui/material/Alert";
import { useContext } from "react";
import UseContext from "../../State/UseState/UseContext";
import Snackbar from "@mui/material/Snackbar";
import { AlertTitle, Button, IconButton, Slide, Stack } from "@mui/material";
import { Call, CallEnd, Close, Phone } from "@mui/icons-material";
import LoginContext from "../../State/Login/LoginContext";

export default function CallAlert() {
  const {
    callAlert,
    redirect,
    callInstance,
    caller,
    availableConnection,
    me,
    setCallAlert,
  } = useContext(UseContext);
  const { acceptCall } = useContext(LoginContext);

  // function TransitionLeft(props) {
  //   return <Slide {...props} direction="left" />;
  // }
  return (
    <>
      {/* <Alert severity="error">This is an error alert — check it out!</Alert>
      <Alert severity="warning">This is a warning alert — check it out!</Alert>
      <Alert severity="info">This is an info alert — check it out!</Alert>
      <Alert severity="success">This is a success alert — check it out!</Alert> */}
      <Snackbar
        // TransitionComponent={TransitionLeft}
        open={callAlert}
      >
        <Alert
          severity={"info"}
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
                    setCallAlert(false);
                    if (callInstance !== null) {
                      acceptCall();
                    }
                  }}
                >
                  <Call />
                </IconButton>
                <IconButton
                  style={{ marginX: "0px 10px" }}
                  color="warning"
                  size="medium"
                  onClick={() => {
                    availableConnection.current.close();

                    availableConnection.current = null;
                    redirect("/");
                    setCallAlert(false);
                  }}
                >
                  <CallEnd />
                </IconButton>
              </Stack>
            </>
          }
        >
          <AlertTitle>{caller}</AlertTitle>
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
