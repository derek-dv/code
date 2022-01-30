import React, { useEffect } from "react";

// Components
import Heading from "../Heading";

//

const Alert = ({ id, text }) => {
  return (
    <div className={`py-3 px-3 bg-green-500 shadow-md rounded-lg mb-2`}>
      <Heading type="smallHeading" removeBottomSpacing>
        <span className="text-white">{text}</span>
      </Heading>
    </div>
  );
};

export default Alert;
