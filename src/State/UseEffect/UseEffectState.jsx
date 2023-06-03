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
    cookies,
    setCookie,
    socket,
    setTabData,
    removeCookie,
  } = useContext(UseContext);
  const {
    getPosts,
    getFriends,
    setMeUniVersal,
    findUniqueElements,
    getCommonObjectsByProperty,
    fetchMoments,
  } = useContext(LoginContext);
  const redirect = useNavigate();
  const state = { name: "harry", class: "5b" };
  useEffect(() => {
    const handleRegisterWithId = async () => {
      try {
        if (!me._id) {
          if (cookies["login"]) {
            const decodedToken = jwt_decode(cookies["login"]);
            const data = { id: decodedToken.user };
            const config = { headers: { "Content-Type": "application/json" } };

            const response = await axios.post(
              process.env.REACT_APP_REGISTER_WITH_ID,
              data,
              config
            );

            if (response?.data) {
              const expirationDate = new Date();
              expirationDate.setDate(expirationDate.getDate() + 30);

              setCookie("login", response.data.token, {
                expires: expirationDate,
              });
              setMeUniVersal(response);
              socket.current.emit("add-user", response.data.user._id);
              redirect("/");
            } else {
              removeCookie("login", { expires: new Date(0) });
            }
          } else {
            redirect("/login");
          }
        }
      } catch (error) {
        console.log(error);
        redirect("/login");
      }
    };

    setProgress(10);
    setTimeout(() => {
      setProgress(100);
    }, 1000);

    handleRegisterWithId();
  }, [location.pathname]);

  useEffect(() => {
    if (me._id === null) {
    } else {
      getPosts("firstTime");
      fetchMoments();

      getFriends();
    }
    // eslint-disable-next-line
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
  useEffect(() => {
    let difference = getCommonObjectsByProperty(me.followers, me.following);

    setTabData((copy) => ({ ...copy, tab1: difference }));
    //eslint-disable-next-line
  }, [me.followers, me.following]);
  useEffect(() => {
    let difference = findUniqueElements(me.followers, me.following, "_id");

    setTabData((copy) => ({ ...copy, tab3: difference }));
    // eslint-disable-next-line
  }, [me.followers, me.following]);
  return (
    <UseEffectContext.Provider value={{ state }}>
      {props.children}
    </UseEffectContext.Provider>
  );
};
export default UseEffectState;
