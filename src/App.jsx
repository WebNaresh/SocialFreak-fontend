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
// mulitple screen size xs,sm,md,lg,xl

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: colors.blueGrey[200],
      },
      secondary: {
        main: colors.blue[300],
      },
    },
  });
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
                    <TopNav />
                    <Backdrop />
                    <Route />
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
