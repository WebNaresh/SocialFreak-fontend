import React, { useEffect } from "react";
import { useContext } from "react";
import LoginContext from "../Login/LoginContext";
import UseContext from "../UseState/UseContext";
import UseEffectContext from "./UseEffectContext";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export const UseEffectState = (props) => {
  const {
    setProgress,
    location,
    me,
    data,
    setData,
    stream,
    cookies,
    setCookie,
    setMe,
    socket,
  } = useContext(UseContext);
  const { getPosts, getFriends, setMeUniVersal } = useContext(LoginContext);
  const redirect = useNavigate();
  const state = { name: "harry", class: "5b" };
  useEffect(() => {
    setProgress(10);
    setTimeout(() => {
      setProgress(100);
    }, 1000);

    if (me._id === null) {
      if (cookies["login"]) {
        jwt_decode(cookies["login"]);
        const data = {
          id: jwt_decode(cookies["login"]).user,
        };
        const config = { headers: { "Content-Type": "application/json" } };
        axios
          .post(process.env.REACT_APP_REGISTER_WITH_ID, data, config)
          .catch((errors) => {
            redirect("/login");
          })
          .then((response) => {
            function addDays(date, days) {
              const result = new Date(date);
              result.setDate(result.getDate() + days);
              return result;
            }
            const expirationDate = addDays(new Date(), 30);
            setCookie("login", response.data.token, {
              expires: expirationDate,
            });
            setMeUniVersal(response);
            socket.current.emit("add-user", response.data.user._id);
          });
        redirect("/");
      } else {
        redirect("/login");
      }
    }

    // eslint-disable-next-line
  }, [location.pathname]);

  useEffect(() => {
    if (me._id === null) {
    } else {
      getPosts("firstTime");
      getFriends();
    }
  }, [me._id]);
  // useEffect(() => {
  //   if (me._id === null) {
  //     redirect("/login");
  //   } else {
  //   }
  // }, []);

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
