import React from "react";

const Button = ({ children }) => {
  return (
    <button className="bg-blue-400 hover:bg-blue-500 p-2 px-4 rounded overflow-hidden text-white font-bold text-sm">
      {children}
    </button>
  );
};

export default Button;
