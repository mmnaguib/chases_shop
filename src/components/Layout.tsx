import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../assets/style.css";
const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="contentOutlet">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
