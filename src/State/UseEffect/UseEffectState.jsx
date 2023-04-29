import React, { useEffect } from "react";
import { useContext } from "react";
import LoginContext from "../Login/LoginContext";
import UseContext from "../UseState/UseContext";
import UseEffectContext from "./UseEffectContext";
export const UseEffectState = (props) => {
  const { setProgress, location, me, redirect, data, setData } =
    useContext(UseContext);
  const { getPosts, getFriends } = useContext(LoginContext);
  const state = { name: "harry", class: "5b" };
  useEffect(() => {
    setProgress(10);
    setTimeout(() => {
      setProgress(100);
    }, 1000);
    // eslint-disable-next-line
  }, [location]);
  useEffect(() => {
    if (me._id === null) {
      redirect("/login");
    } else {
      getPosts("firstTime");
      getFriends();
    }
  }, [me._id]);
  useEffect(() => {
    if (me._id !== null) {
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
