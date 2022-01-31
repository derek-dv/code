import React from "react";

// Components
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ user, children }) => {
  return (
    <div className="h-screen layout">
      <Navbar user={user} />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
