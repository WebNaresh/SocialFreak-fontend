import React, { useContext, useEffect } from "react";
import ChatDisplay from "../ChatDisplay/ChatDisplay";
import UseContext from "../../../State/UseState/UseContext";
import ChatUI from "./ChatUi/ChatUI";

const Tab1 = () => {
  const { me, utils, tabData, setTabData } = useContext(UseContext);

  return (
    <>
      {utils.cuurentUserIdForMsg === null ? (
        <div>
          {tabData.tab1 !== null
            ? tabData.tab1.map((data, i) => {
                return <ChatDisplay key={i} data={data} />;
              })
            : ""}
        </div>
      ) : (
        <>
          <ChatUI />
        </>
      )}
    </>
  );
};

export default Tab1;
