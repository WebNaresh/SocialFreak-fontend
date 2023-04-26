import { Stack } from "@mui/material";
import React, { useContext } from "react";
import ReqDisplay from "../ReqDisplay/ReqDisplay";
import UseContext from "../../../State/UseState/UseContext";

const Tab2 = () => {
  const { me } = useContext(UseContext);
  return (
    <Stack>
      {me.userSuggestion !== null
        ? me.userSuggestion.map((data, index) => {
            return <ReqDisplay key={index} data={data} />;
          })
        : ""}
    </Stack>
  );
};

export default Tab2;
