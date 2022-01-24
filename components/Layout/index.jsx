import React from "react";


// Components
import Navbar from "./Navbar";
import Footer from "./Footer"

const Layout = ({ children }) => {
  return (
    <div className="h-screen layout">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
