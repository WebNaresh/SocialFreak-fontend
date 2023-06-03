import React from "react";
import { useParams } from "react-router-dom";

const OtherProfile = () => {
  const { id } = useParams();

  // Use the ID in your component logic
  console.log(id); // or do something else with the ID
  return <div>OtherProfile</div>;
};

export default OtherProfile;
