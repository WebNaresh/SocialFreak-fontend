import React, { useContext } from "react";
import Backdrop from "@mui/material/Backdrop";

import UseContext from "../../State/UseState/UseContext";

const BackdropElement = () => {
  const { backdrop, setBackdrop } = useContext(UseContext);
  return (
    <>
      {backdrop ? (
        <Backdrop
          onMouseEnter={() => setBackdrop(false)}
          sx={{
            zIndex: 1201,
          }}
          open={backdrop}
        ></Backdrop>
      ) : (
        ""
      )}
    </>
  );
};

export default BackdropElement;
