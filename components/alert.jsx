import React, { useEffect } from "react";

// Components

//

const Alert = ({ id, text, variant }) => {
  return (
    <div
      className={`py-3 px-3 shadow-md rounded-lg mb-2`}
      style={{
        backgroundColor: variant === "error" ? "red" : "green",
      }}
    >
      <h1 type="smallHeading" removeBottomSpacing>
        <span className="text-white">{text}</span>
      </h1>
    </div>
  );
};

export default Alert;
