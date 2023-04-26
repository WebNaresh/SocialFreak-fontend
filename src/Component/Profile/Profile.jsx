import React from "react";
import { useLocation } from "react-router-dom";
import Mansoory from "./Mansory/Mansoory";
import ProfileCard from "./ProfileCard/ProfileCard";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import { useContext } from "react";
import UseContext from "../../State/UseState/UseContext";

const Profile = () => {
  const location = useLocation();
  const { me, setMe } = useContext(UseContext);
  return (
    <div
      style={{ overflowY: "auto", padding: location.pathname === "/" ? 0 : 16 }}
    >
      <ProfileCard me={me} setMe={setMe} />
      <ProfileInfo me={me} />
      <Mansoory me={me} />
    </div>
  );
};

export default Profile;
