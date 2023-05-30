import axios from "axios";
import React, { useContext } from "react";
import TestContext from "../Test/TestContext";
import UseContext from "../UseState/UseContext";
import LoginContext from "./LoginContext";
import jwtDecode from "jwt-decode";
import Peer from "peerjs";
export const LoginState = (props) => {
  const {
    me,
    setMe,
    redirect,
    setOpen,
    open,
    formData,
    setFormData,
    data,
    posts,
    setPosts,
    utils,
    setUtils,
    allLink,
    socket,
    setChats,
    setCookie,
    availableConnection,
    userVideo,
    setCallAlert,
    callingRef,
    setStream,
    myVideo,
    peerState,
    setPeerState,
  } = useContext(UseContext);
  const { handleLoader } = useContext(TestContext);

  const handleFaceBookLogin = (responese) => {
    function addDays(date, days) {
      const result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    }
    const data = {
      userName: responese.name,
      profilePicture: responese.picture.data.url,
      userEmail: responese.email,
    };
    const config = { headers: { "Content-Type": "application/json" } };

    axios
      .post(process.env.REACT_APP_REGISTER_USER, data, config)
      .catch((errors) => {})
      .then((response) => {
        const expirationDate = addDays(new Date(), 30);
        setCookie("login", response.data.token, {
          expires: expirationDate,
        });
        setMeUniVersal(response);

        socket.current.emit("add-user", response.data.user._id);
        redirect("/");
      });
  };
  const handleFacebookComponentClicked = (response) => {};
  const handleGoogleLogin = (e) => {
    let responese = jwtDecode(e.credential);
    const data = {
      userName: responese.name,
      profilePicture: responese.picture,
      userEmail: responese.email,
    };
    const config = { headers: { "Content-Type": "application/json" } };

    axios
      .post(process.env.REACT_APP_REGISTER_USER, data, config)
      .catch((errors) => {})
      .then((response) => {
        setCookie("login", response.data.token, {
          maxAge: 30 * 24 * 60 * 60,
        });
        setMeUniVersal(response);

        redirect("/");
        socket.current.emit("add-user", response.data.user._id);
      });
  };
  const handleGoogleLoginFail = (e) => {};
  const updateDataFromBackend = () => {
    const data = {
      profileLink: formData.profileLink,
      backgroundLink: formData.backgroundLink,
      userName: formData.userName,
      hightlight: formData.array,
    };
    const config = { headers: { "Content-Type": "application/json" } };
    handleLoader();
    axios
      .put(
        `${process.env.REACT_APP_UPDATE_PROFILE_CARD}${me._id}`,
        data,
        config
      )
      .catch((errors) => {})
      .then((response) => {
        setMeUniVersal(response);
        setFormData({
          ...formData,
          selectedProfilePic: null,
          selectedBackgroundPic: null,
        });
      });
    setOpen({
      ...open,
      profileCard: false,
    });
  };

  const uploadToCloudinary = async (file, string) => {
    handleLoader(true, "#fff", 4000);
    const formDataD = new FormData();
    formDataD.append("file", file);
    formDataD.append("upload_preset", "y7gvucmq");
    const response = axios.post(
      process.env.REACT_APP_UPDATE_CLUDINARY_LINK,
      formDataD
    );
    // .then(async (res) => {
    if (string === "profile") {
      handleLoader();
      setFormData({
        ...formData,
        profileLink: response.data.url,
        selectedProfilePic: null,
      });
    } else if (string === "background") {
      handleLoader();
      setFormData({
        ...formData,
        backgroundLink: response.data.url,
        selectedBackgroundPic: null,
      });
    }
  };

  const updateProfileInfoToBackend = (info) => {
    const config = { headers: { "Content-Type": "application/json" } };
    handleLoader();
    axios
      .put(
        `${process.env.REACT_APP_UPDATE_UPDATE_PROFILE_INFO_TO_BACKEND}${me._id}`,
        info,
        config
      )
      .then((response) => {
        setMeUniVersal(response);
      });
    setOpen({
      ...open,
      profileInfo: false,
    });
  };

  const handlePost = (images) => {
    const data1 = {
      imagesArray: images,
      title: data.title,
      taggedPeople: data.taggedPeopleArray,
      hashTags: data.hashtagArray,
    };
    setOpen({
      ...open,
      createModal: false,
    });
    handleLoader(true, "#fff", 4000);
    const config = { headers: { "Content-Type": "application/json" } };
    axios
      .post(`${process.env.REACT_APP_CREATE_POST}${me._id}`, data1, config)
      .catch((errors) => {})
      .then((response) => {
        setPosts([response.data.post, ...posts]);
        handleLoader();
      });
  };
  const requestToView = async (id) => {
    const data = {
      postId: id,
    };
    const config = { headers: { "Content-Type": "application/json" } };
    await axios
      .post(`${process.env.REACT_APP_VIEW_POST}${me._id}`, data, config)
      .catch((errors) => {});
  };
  function getPosts(firstTime) {
    // handleLoader(true, "#fff", 4000);
    if (firstTime === "firstTime") {
      axios
        .post(allLink.getPostLink + me._id + "/?page=" + utils.pageNumber)
        .then((res) => {
          setPosts([...posts, ...res.data.posts]);
        });
    } else {
      axios
        .post(allLink.getPostLink + me._id + "/?page=" + utils.pageNumber)
        .then((res) => {
          setPosts([...posts, ...res.data.posts]);
        });
      // socket.current.emit("get-post", utils.pageNumber, me._id);
    }
    setUtils((value) => ({ ...value, pageNumber: value.pageNumber + 1 }));
  }
  const getFriends = () => {
    const config = { headers: { "Content-Type": "application/json" } };
    axios
      .post(`${process.env.REACT_APP_GET_FREINDS}${me._id}`, config)
      .catch((errors) => {})
      .then((response) => {});
  };
  const myFun = (data) => {
    if (utils.cuurentUserIdForMsg === data.sender._id) {
      setChats((chat) => [...chat, data]);
    } else {
      setUtils((copy) => ({
        ...copy,
        messageNotification: utils.messageNotification + 1,
      }));
    }
  };
  const callVideoCall = (id) => {
    redirect("/chat");

    const connection = peerState.connect(id);
    connection.send("data");
    connection["caller"] = me._id;
    availableConnection.current = connection;
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        const call = peerState.call(id, stream);

        call.on("stream", (remoteStream) => {
          if (userVideo.current) {
            userVideo.current.srcObject = remoteStream;
          }
        });
        if (myVideo.current) {
          myVideo.current.srcObject = stream;
        }
      });
  };

  const acceptCall = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);

        callingRef.current.answer(stream);
        if (myVideo.current) {
          myVideo.current.srcObject = stream;
        }
      });
    callingRef.current.on("stream", function (remoteStream) {
      if (userVideo.current) {
        userVideo.current.srcObject = remoteStream;
      }
    });

    setCallAlert(false);
  };
  const uploadImagesAndSendToServer = async (files) => {
    try {
      const uploadedImages = [];

      for (const file of files) {
        const uploadedImage = await uploadToCloudinary2(file);
        uploadedImages.push(uploadedImage);
      }

      await handlePost(uploadedImages);

      // Code to execute after uploading images and sending them to the server
    } catch (error) {
      // Handle any errors that occurred during the process
    }
  };
  async function uploadToCloudinary2(file) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "y7gvucmq");

    try {
      const response = await axios.post(
        process.env.REACT_APP_UPDATE_CLUDINARY_LINK,
        formData
      );

      return response.data.secure_url;
    } catch (error) {
      throw error;
    }
  }

  let setMeUniVersal = (response) => {
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
  };
  return (
    <LoginContext.Provider
      value={{
        handleFaceBookLogin,
        handleFacebookComponentClicked,
        handleGoogleLoginFail,
        handleGoogleLogin,
        updateDataFromBackend,
        uploadToCloudinary,
        updateProfileInfoToBackend,
        handlePost,
        requestToView,
        getPosts,
        getFriends,
        myFun,
        callVideoCall,
        acceptCall,
        uploadImagesAndSendToServer,
        setMeUniVersal,
      }}
    >
      {props.children}
    </LoginContext.Provider>
  );
};
export default LoginState;
