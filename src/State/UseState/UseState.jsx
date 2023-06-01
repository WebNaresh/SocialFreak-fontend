import React, { useRef, useState } from "react";
import UseContext from "./UseContext";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router-dom";

export const UseState = (props) => {
  // ALL REF

  // Ref for socket connection
  const socket = useRef(null);

  // Ref for storing a reference to a DOM element
  const oneRef = useRef(null);
  const userId = useRef(null);
  const chat = useRef([]);
  const myVideo = useRef(null);
  const userVideo = useRef(null);
  const peerInstance = useRef(null);
  const availableConnection = useRef(null);
  const callingRef = useRef(null);

  // ALL STATE

  // State for managing cookies
  const [cookies, setCookie, removeCookie] = useCookies(["cookie-name"]);

  // State for managing the PeerJS instance
  const [peerState, setPeerState] = useState(null);

  // State for backdrop visibility
  const [backdrop, setBackdrop] = useState(false);

  // State for managing the media stream
  const [stream, setStream] = useState(null);

  // State for managing the video call alert
  const [callAlert, setCallAlert] = useState(false);

  // State for storing the Peer ID
  const [peerId, setPeerId] = useState(null);

  // Other hooks
  const location = useLocation();
  const redirect = useNavigate();

  // State for app alert
  const [appAlert, setAppAlert] = useState({
    alert: true,
    type: "success",
    msg: "this is success alert",
  });

  // State for app loading
  const [appLoading, setAppLoading] = useState({
    load: false,
    color: "#fff",
  });

  // State for progress
  const [progress, setProgress] = useState(0);

  // State for text or keyboard
  const [TextOrKeyBoard, setTextOrKeyBoard] = useState(true);

  // State for user profile information
  const [me, setMe] = useState({
    backgroundPicture: null,
    birthDate: null,
    collegeName: null,
    descriptionHighLight: null,
    followers: [],
    following: [],
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
    userSuggestion: [],
  });
  console.log(`🚀 ~ me:`, me);

  // State for moments
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

  // State for posts
  const [posts, setPosts] = useState([]);

  // State for open modals and cards
  const [open, setOpen] = React.useState({
    profileCard: false,
    profileInfo: false,
    createModal: false,
    commentModal: false,
  });

  // State for form data
  const [formData, setFormData] = useState({
    profileLink: me.profilePicture,
    backgroundLink: me.backgroundPicture,
    userName: me.userName,
    array: me.descriptionHighLight,
    selectedBackgroundPic: null,
    selectedProfilePic: null,
  });

  // State for data
  const [data, setData] = useState({
    title: "Add a Title",
    hashtagArray: [],
    taggedPeopleArray: [],
    uploadedImages: [],
    imageArray: [],
    files: null,
    buttonDisable: true,
    handleuploadIcon: false,
  });

  // State for utilities
  const [utils, setUtils] = useState({
    pageNumber: 0,
    commentArray: [],
    currentPostId: "",
    request: true,
    cuurentUserIdForMsg: null,
    onlineUser: new Map(),
    chatSpinner: false,
    chat: [],
    messageNotification: [],
  });

  const [appNotification, setAppNotification] = useState([
    {
      redirect: "/message",
      message: "naresh is here",
      image:
        "https://platform-lookaside.fbsbx.com/platform/prof…&width=50&ext=1688196681&hash=AeQQxqchD8KtNKl1SQI",
    },
  ]);

  // State for chat messages
  const [chats, setChats] = useState([]);

  // State for page number
  const [pageNumber, setPageNumber] = useState(0);

  // State for theme
  const [theme, setTheme] = useState({
    primary: "#b0bec5",
    body: "",
  });

  // State for tab data
  const [tabData, setTabData] = useState({
    tab1: [],
    tab2: [],
    tab3: [],
  });

  // Value for context provider
  const contextValue = {
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
    theme,
    setTheme,
    tabData,
    setTabData,
    peerState,
    setPeerState,
    TextOrKeyBoard,
    setTextOrKeyBoard,
  };

  return (
    <UseContext.Provider value={contextValue}>
      {props.children}
    </UseContext.Provider>
  );
};

export default UseState;
