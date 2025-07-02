import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../assets/style.css";
const Layout = () => {
  const location = useLocation();

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      {!isAuthPage && <Navbar />}
      <div className={isAuthPage ? "contentOutlet auth" : "contentOutlet"}>
        <Outlet />
      </div>
      {!isAuthPage && <Footer />}
    </>
  );
};

export default Layout;
