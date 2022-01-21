import React from "react";

// Components
import Navbar from "./Navbar";
import Notifications from "../UI/Notifications";

const Layout = ({ children }) => {
  return (
    <div>
      <Notifications />
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
