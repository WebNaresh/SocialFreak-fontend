import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import ProfileCard from "../Profile/ProfileCard/ProfileCard";
import ProfileInfo from "../Profile/ProfileInfo/ProfileInfo";
import Post from "../Main/Post/Post";
import Mansoory from "../Profile/Mansory/Mansoory";
import UseContext from "../../State/UseState/UseContext";

const OtherProfile = () => {
  const location = useLocation();
  const data = location.state;
  const [otherProfile, setOtherProfile] = useState(null);
  const { me } = useContext(UseContext);
  useEffect(() => {
    const getUserInfo = async () => {
      const data1 = {
        id: data.userId._id,
      };
      const config = { headers: { "Content-Type": "application/json" } };
      await axios
        .post(process.env.REACT_APP_REGISTER_WITH_ID, data1, config)
        .catch((errors) => {
          console.log(errors);
        })
        .then((response) => {
          setOtherProfile(response.data.user);
        });
    };
    getUserInfo();
  }, []);

  return (
    <div
      style={{ overflowY: "auto", padding: location.pathname === "/" ? 0 : 16 }}
    >
      <ProfileCard
        me={otherProfile}
        string={me._id !== otherProfile?._id ? "other" : ""}
      />
      <ProfileInfo
        me={otherProfile}
        string={me._id !== otherProfile?._id ? "other" : ""}
      />
      {otherProfile?.post?.map((data, key) => {
        return <Post key={key} data={data} />;
      })}
      <Mansoory me={otherProfile} />
    </div>
  );
};

export default OtherProfile;
