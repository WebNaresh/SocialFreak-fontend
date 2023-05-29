import { Stack } from "@mui/material";
import React, { useContext } from "react";
import UseContext from "../../../State/UseState/UseContext";
import ReqTab from "../ReqDisplay/RequestTab";
import { useState } from "react";
import { useEffect } from "react";

const Tab3 = () => {
  const { me, tabData, setTabData } = useContext(UseContext);
  const [diff, setDiff] = useState([]);
  function findUniqueElements(array1, array2, property) {
    const uniqueElements = [];

    // Iterate over elements in array1
    for (let i = 0; i < array1.length; i++) {
      const element = array1[i];

      // Check if element is not present in array2 based on the specified property
      if (!array2.some((item) => item[property] === element[property])) {
        uniqueElements.push(element);
      }
    }

    // Iterate over elements in array2
    for (let i = 0; i < array2.length; i++) {
      const element = array2[i];

      // Check if element is not present in array1 based on the specified property
      if (!array1.some((item) => item[property] === element[property])) {
        uniqueElements.push(element);
      }
    }

    return uniqueElements;
  }

  // Example usage
  const array1 = [1, 2, 3, 4, 5];
  const array2 = [4, 5, 6, 7, 8];

  const uniqueArray = findUniqueElements(me.followers, me.following);
  console.log(uniqueArray);

  useEffect(() => {
    let difference = findUniqueElements(me.followers, me.following, "_id");
    console.log(`🚀 ~ difference:`, difference);

    setTabData((copy) => ({ ...copy, tab3: difference }));
    setDiff(difference);
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
