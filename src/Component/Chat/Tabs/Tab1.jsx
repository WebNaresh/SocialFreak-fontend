import React, { useContext } from "react";
import ChatDisplay from "../ChatDisplay/ChatDisplay";
import UseContext from "../../../State/UseState/UseContext";
import ChatUI from "./ChatUi/ChatUI";

const Tab1 = () => {
  const { me, utils } = useContext(UseContext);
  return (
    <>
      {utils.cuurentUserIdForMsg === null ? (
        <div>
          {me.friends !== null
            ? me.friends.map((data, i) => {
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
