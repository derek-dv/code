import React from "react";

const Heading = ({ children, className, type }) => {
  const commonClasses = `text-gray-800 ${className}`;

  switch (type) {
    case "mainHeading":
      return (
        <h1 className={`text-3xl font-bold ${commonClasses}`}>{children}</h1>
      );
    case "sectionHeading":
      return (
        <h2 className={`text-xl font-bold text-gray-800 ${className}`}>
          {children}
        </h2>
      );
    case "smallHeading":
      return (
        <h3 className={`text-lg font-semibold text-gray-800 ${className}`}>
          {children}
        </h3>
      );
    default:
      return (
        <h1 className={`text-3xl font-bold ${commonClasses}`}>{children}</h1>
      );
  }
};

export default Heading;
