import { Stack } from "@mui/material";
import React, { useContext } from "react";
import UseContext from "../../../State/UseState/UseContext";
import ReqTab from "../ReqDisplay/RequestTab";
import { useState } from "react";
import { useEffect } from "react";

const Tab3 = () => {
  const { me } = useContext(UseContext);
  const [diff, setDiff] = useState([]);
  console.log(`🚀 ~ diff:`, diff);

  useEffect(() => {
    console.log(`🚀 ~ me.followers:`, me.followers);
    console.log(`🚀 ~ me.following:`, me.following);
    console.log(`🚀 ~ me.followers.length > 1:`, me.followers.length > 1);
    const difference = me.followers.filter(
      (element) => !me.following.includes(element)
    );
    console.log(`🚀 ~ difference:`, difference);
    setDiff(difference);
  }, [me.followers, me.following]);

  // const difference = arr1.filter((element) => !arr2.includes(element));

  return (
    <Stack>
      {diff !== null
        ? diff.map((data, index) => {
            return <ReqTab key={index} data={data} />;
          })
        : ""}
    </Stack>
  );
};

export default Tab3;
