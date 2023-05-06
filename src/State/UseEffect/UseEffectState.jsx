import React, { useEffect } from "react";
import { useContext } from "react";
import LoginContext from "../Login/LoginContext";
import UseContext from "../UseState/UseContext";
import UseEffectContext from "./UseEffectContext";
import Peer from "peerjs";
import { useNavigate } from "react-router-dom";
export const UseEffectState = (props) => {
  const { setProgress, location, me, data, setData, stream, setStream } =
    useContext(UseContext);
  const { getPosts, getFriends } = useContext(LoginContext);
  const redirect = useNavigate();
  const state = { name: "harry", class: "5b" };
  useEffect(() => {
    setProgress(10);
    setTimeout(() => {
      setProgress(100);
    }, 1000);
    if (me._id === null) {
      redirect("/login");
    }
    if (location.pathname !== "/chat") {
      if (stream !== null) {
        stream.getTracks().forEach(function (track) {
          track.stop();
        });
        setStream(null);
      }
    }

    // eslint-disable-next-line
  }, [location.pathname]);
  useEffect(() => {
    if (me._id === null) {
      redirect("/login");
    } else {
      getPosts("firstTime");
      getFriends();
    }
  }, [me._id]);

  useEffect(() => {
    if (
      data.uploadedImages.length >= 1 &&
      data.uploadedImages.length === data.files.length
    ) {
      setData({
        ...data,
        buttonDisable: false,
        handleuploadIcon: false,
      });
    } else {
      setData({
        ...data,
        buttonDisable: true,
      });
    }
    // eslint-disable-next-line
  }, [data.uploadedImages.length]);

  return (
    <UseEffectContext.Provider value={{ state }}>
      {props.children}
    </UseEffectContext.Provider>
  );
};
export default UseEffectState;
