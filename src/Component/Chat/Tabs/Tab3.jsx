import { Stack } from "@mui/material";
import React, { useContext } from "react";
import UseContext from "../../../State/UseState/UseContext";
import ReqTab from "../ReqDisplay/RequestTab";
import { useState } from "react";
import { useEffect } from "react";

const Tab3 = () => {
  const { me, tabData, setTabData } = useContext(UseContext);
  const [diff, setDiff] = useState([]);

  useEffect(() => {
    if (me.following.length < 1) {
      console.log(me.following.length < 1);

      setDiff(me.followers);
    } else {
      const difference = me.followers.filter(
        (element) => element._id !== element._id
      );
      console.log(`🚀 ~ difference:`, difference);
      setTabData((copy) => ({ ...copy, tab3: difference }));
      setDiff(difference);
    }
  }, [me.followers, me.following]);

  // const difference = arr1.filter((element) => !arr2.includes(element));

  return (
    <Stack>
      {tabData.tab3 !== null
        ? tabData.tab3.map((data, index) => {
            return <ReqTab key={index} data={data} />;
          })
        : ""}
    </Stack>
  );
};

export default Tab3;
