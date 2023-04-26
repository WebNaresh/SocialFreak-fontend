import React, { useContext } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import ReportIcon from "@mui/icons-material/Report";
import UseContext from "../../State/UseState/UseContext";

const AppLoader = () => {
  const { appLoading } = useContext(UseContext);
  return (
    <>
      {appLoading.load ? (
        <Backdrop
          sx={{
            color: appLoading.color,
            zIndex: (theme) => 1301,
          }}
          open={true}
        >
          {/* noTYOUR */}
          <CircularProgress
            sx={{
              zIndex: (theme) => 1301,
            }}
            color={"inherit"}
          >
            {appLoading.color === "danger" ? <ReportIcon color="danger" /> : ""}
          </CircularProgress>
        </Backdrop>
      ) : (
        ""
      )}
    </>
  );
};

export default AppLoader;
