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

  // State for moments
  const [moments, SetMoments] = useState([]);

  // State for posts
  const [posts, setPosts] = useState([]);

  // State for open modals and cards
  const [open, setOpen] = React.useState({
    profileCard: false,
    profileInfo: false,
    createModal: false,
    commentModal: false,
    statusModal: false,
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
