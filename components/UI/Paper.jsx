import React from "react";

const Paper = ({ children, className }) => {
  return (
    <div
      className={`border border-gray-200 shadow-sm rounded overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
};

export default Paper;
