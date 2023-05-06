import { Facebook } from "@mui/icons-material";
import { Stack, Paper } from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
import React from "react";
import LoginVIdeo from "./LoginVideo/login.mp4";
import ReactFacebookLogin from "react-facebook-login";
import { useContext } from "react";
import LoginContext from "../../State/Login/LoginContext";

const Login = () => {
  const {
    handleFacebookComponentClicked,
    handleFaceBookLogin,
    handleGoogleLoginFail,
    handleGoogleLogin,
  } = useContext(LoginContext);

  return (
    <div>
      <Stack
        width={"100%"}
        height={"100vh"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"row"}
      >
        <video
          disablePictureInPicture
          src={LoginVIdeo}
          autoPlay
          loop
          muted
          style={{
            objectFit: "cover",
            width: "100%",
            height: "100%",
            position: "absolute",
            filter: "blur(2px)",
          }}
        ></video>
        <Paper
          sx={{ flexDirection: "row", display: "flex", position: "relative" }}
          variant="outlined"
        >
          <Stack m={1}>
            <GoogleLogin
              size="large"
              type="icon"
              shape="square"
              width="400"
              theme="filled"
              onSuccess={handleGoogleLogin}
              useOneTap={true}
              onError={handleGoogleLoginFail}
              logo_alignment={"left"}
              context={"signin"}
            />
          </Stack>
          <Stack m={1}>
            <ReactFacebookLogin
              appId="208386225185183"
              fields="name,email,picture"
              onClick={handleFacebookComponentClicked}
              callback={handleFaceBookLogin}
              icon={<Facebook />}
              size="small"
              textButton=""
            />
          </Stack>
        </Paper>
      </Stack>
    </div>
  );
};

export default Login;
