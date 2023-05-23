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
    removeCookie,
    cookies,
    setCookie,
    setMe,
    socket,
  } = useContext(UseContext);
  const { getPosts, getFriends } = useContext(LoginContext);
  const redirect = useNavigate();
  const state = { name: "harry", class: "5b" };
  useEffect(() => {
    setProgress(10);
    setTimeout(() => {
      setProgress(100);
    }, 1000);
    console.log(`🚀 ~ cookies["login"]:`, cookies["login"]);

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
            console.log(errors);
            redirect("/login");
          })
          .then((response) => {
            setCookie("login", response.data.token, {
              maxAge: 30 * 24 * 60 * 60,
            });
            setMe({
              ...me,
              backgroundPicture: response.data.user.backgroundPicture,
              birthDate: response.data.user.birthDate,
              collegeName: response.data.user.collegeName,
              descriptionHighLight: response.data.user.descriptionHighLight,
              followers: response.data.user.followers,
              following: response.data.user.following,
              hashTags: response.data.user.hashTags,
              hobby: response.data.user.hobby,
              memories: response.data.user.memories,
              post: response.data.user.post,
              profilePicture: response.data.user.profilePicture,
              relationShip: response.data.user.relationShip,
              taggedPeople: response.data.user.taggedPeople,
              userEmail: response.data.user.userEmail,
              userName: response.data.user.userName,
              _id: response.data.user._id,
              location: response.data.user.location,
              nickName: response.data.user.nickName,
              friends: response.data.user.friends,
              userSuggestion: response.data.user.userSuggestion,
            });
            socket.current.emit("add-user", response.data.user._id);
          });
        redirect("/");
      } else {
        redirect("/login");
      }
    }
    if (location.pathname !== "/chat") {
      if (stream !== null || undefined) {
        stream.getTracks().forEach(function (track) {
          track.stop();
        });

        // setStream(null);
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
