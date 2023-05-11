import React, { useRef, useState } from "react";
import UseContext from "./UseContext";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router-dom";

export const UseState = (props) => {
  // ALL REF

  const socket = useRef(null);

  const oneRef = useRef(null);

  const userId = useRef(null);

  const chat = useRef([]);
  const myVideo = useRef(null);
  const userVideo = useRef(null);
  const peerInstance = useRef(null);
  console.log(`🚀 ~ peerInstance:`, peerInstance);
  const availableConnection = useRef(null);
  const callingRef = useRef(null);

  // ALL STATE

  const [cookies, setCookie, removeCookie] = useCookies(["cookie-name"]);
  const [backdrop, setBackdrop] = useState(false);

  const [stream, setStream] = useState(null);

  const [callAlert, setCallAlert] = useState(false);

  const [peerId, setPeerId] = useState(null);

  const location = useLocation();
  const redirect = useNavigate();

  const [appAlert, setAppAlert] = useState({
    alert: true,
    type: "success",
    msg: "this is success alert",
  });

  const [appLoading, setAppLoading] = useState({
    load: false,
    color: "#fff",
  });

  const [progress, setProgress] = useState(0);

  const [me, setMe] = useState({
    backgroundPicture: null,
    birthDate: null,
    collegeName: null,
    descriptionHighLight: null,
    followers: null,
    following: null,
    hashTags: null,
    hobby: null,
    memories: null,
    post: null,
    profilePicture: null,
    relationShip: null,
    taggedPeople: null,
    userEmail: null,
    userName: null,
    _id: null,
    location: null,
    nickName: null,
    friends: null,
    userSuggestion: null,
  });
  const [moments, SetMoments] = useState([
    {
      coverPhoto:
        "https://images.unsplash.com/photo-1619198511074-680af0a21527?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      backgroundPicture:
        "https://images.unsplash.com/photo-1619198831203-6c48a27075f2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      userName: "Dev fei",
      from: "",
    },
    {
      coverPhoto:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80",
      backgroundPicture:
        "https://images.unsplash.com/photo-1535704882196-765e5fc62a53?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80",
      userName: "xiomi fei",
      from: "",
    },
    {
      coverPhoto:
        "https://images.unsplash.com/photo-1475823678248-624fc6f85785?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      backgroundPicture:
        "https://images.unsplash.com/photo-1508449405506-2f559e868bdd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      userName: "xyne me",
      from: "",
    },
    {
      coverPhoto:
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      backgroundPicture:
        "https://images.unsplash.com/photo-1593484330639-614d0634f68f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      userName: "Shirley Setia",
      from: "",
    },
    {
      coverPhoto:
        "https://images.unsplash.com/photo-1622804136680-46dc2a8f0598?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      backgroundPicture:
        "https://images.unsplash.com/photo-1533729590644-695ded775a63?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80",
      userName: "Xing Fei",
    },
  ]);

  const [posts, setPosts] = useState([]);
  const [open, setOpen] = React.useState({
    profileCard: false,
    profileInfo: false,
    createModal: false,
    commentModal: false,
  });
  const [utils, setUtils] = useState({
    pageNumber: 0,
    commentArray: [],
    currentPostId: "",
    request: true,
    cuurentUserIdForMsg: null,
    onlineUser: new Map(),
    chatSpinner: false,
    chat: [],
    messageNotification: 0,
  });

  const [chats, setChats] = useState([]);

  const [pageNumber, setPageNumber] = useState(0);

  const [formData, setFormData] = useState({
    profileLink: me.profilePicture,
    backgroundLink: me.backgroundPicture,
    userName: me.userName,
    array: me.descriptionHighLight,
    selectedBackgroundPic: null,
    selectedProfilePic: null,
  });
  const [data, setData] = useState({
    title: "Add an Title",
    hashtagArray: ["example"],
    taggedPeopleArray: ["example"],
    uploadedImages: [],
    imageArray: [],
    files: null,
    buttonDisable: true,
    handleuploadIcon: false,
  });
  const [allLink, setAllLink] = useState({
    getPostLink: `https://socialfreak-backend.onrender.com/post/allPost/`,
  });

  return (
    <UseContext.Provider
      value={{
        cookies,
        setCookie,
        removeCookie,
        appAlert,
        setAppAlert,
        appLoading,
        setAppLoading,
        progress,
        setProgress,
        location,
        me,
        setMe,
        backdrop,
        setBackdrop,
        moments,
        SetMoments,
        posts,
        setPosts,
        open,
        setOpen,
        redirect,
        formData,
        setFormData,
        data,
        setData,
        utils,
        chats,
        setChats,
        setUtils,
        socket,
        allLink,
        setAllLink,
        pageNumber,
        setPageNumber,
        oneRef,
        userId,
        chat,
        myVideo,
        userVideo,
        peerId,
        setPeerId,
        peerInstance,
        callAlert,
        stream,
        setStream,
        setCallAlert,
        availableConnection,
        callingRef,
      }}
    >
      {props.children}
    </UseContext.Provider>
  );
};
export default UseState;
