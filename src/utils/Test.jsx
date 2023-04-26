import React, { useState } from "react";
import VisibilitySensor from "react-visibility-sensor";

const VisibilitySensorImage = () => {
  const [state, setState] = useState(false);

  return (
    <VisibilitySensor
      onChange={(isVisible) => {
        console.log(isVisible);
        setState(isVisible);
      }}
    >
      <img
        // alt={this.props.alt}
        // src={this.props.src}
        style={{
          display: "block",
          maxWidth: "100%",
          width: "100%",
          height: "100vh",
          opacity: state ? 1 : 0.25,
          transition: "opacity 500ms linear",
          background: "blue",
        }}
      />
    </VisibilitySensor>
  );
};

export default VisibilitySensorImage;
