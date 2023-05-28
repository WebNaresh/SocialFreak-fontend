import TestState from "./State/Test/TestState";
import { BrowserRouter } from "react-router-dom";
import Route from "./Route";
import UseEffectState from "./State/UseEffect/UseEffectState";
import UseState from "./State/UseState/UseState";
import AppLoader from "./utils/AppLoader/AppLoader";
import AppAlert from "./utils/AppAlert/AppAlert";
import TopLoadingBar from "./utils/TopLoadingBar/TopLoadingBar";
import TopNav from "./utils/TopNav/TopNav";
import { colors, createTheme, ThemeProvider } from "@mui/material";
import BasicSpeedDial from "./utils/SpeedDial/SpeedDial";
import Backdrop from "./utils/Backdrop/Backdrop";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { LoginState } from "./State/Login/LoginState";
import SocketState from "./State/Socket/ScoketState";
import CallAlert from "./utils/AppAlert/CallAlert";
import TextField1 from "./utils/TextField/TextField1";
// mulitple screen size xs,sm,md,lg,xl

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        // main: colors.blueGrey[200],
        main: colors.blueGrey[200],
      },
      secondary: {
        main: colors.blue[300],
      },
    },
  });
  //   xs, extra-small: 0px
  // sm, small: 600px
  // md, medium: 900px
  // lg, large: 1200px
  // xl, extra-large: 1536px
  return (
    <GoogleOAuthProvider clientId="94683515394-hmvlt9807662a50ott2jiro8ukitq6n0.apps.googleusercontent.com">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <UseState>
            <TestState>
              <LoginState>
                <UseEffectState>
                  <SocketState>
                    <TopLoadingBar />
                    <AppLoader />
                    <AppAlert />
                    <CallAlert />
                    <TopNav />
                    <Backdrop />
                    <Route />
                    <TextField1 />
                    <BasicSpeedDial />
                  </SocketState>
                </UseEffectState>
              </LoginState>
            </TestState>
          </UseState>
        </BrowserRouter>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
