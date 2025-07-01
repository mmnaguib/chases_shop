import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "calc(100vh - 200px)",
        flexDirection: "column",
      }}
    >
      <h1 className="pageHeader">
        <span style={{ color: "#f00" }}> الصفحة دي مش موجودة يا حبيبي</span>
        <br />
        <br />
        <Link to="/" style={{ color: "#fff" }}>
          <FontAwesomeIcon icon={faArrowCircleLeft} />
          <span className="iconWithText"> الصفحة الرئيسية</span>
        </Link>
      </h1>
    </div>
  );
};
