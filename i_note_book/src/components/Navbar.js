import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const logOutHandler = () => {
    localStorage.removeItem("authToken");
    navigate("login");
  };

  //activing current link
  const location = useLocation();
  const activeLink = (e) => {
    // targeting element
    let targetEle = e.target;
    let hrefPath = targetEle.href.split("/");
    let prevClass = targetEle.className;
    let eleHref = hrefPath.slice(hrefPath.length - 1).toString();

    // activing if path match
    if (location.pathname === `/${eleHref}`) {
      targetEle.className = `${prevClass} active`;
      console.log(targetEle.className);
    }

    // removing active class if pathchange
    else {
      let addedClasses = prevClass.split(" ");
      let laterClass = addedClasses
        .filter((className) => className !== "active")
        .join(" ");
      targetEle.className = laterClass;
    }
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link to="#" className="navbar-brand">
            Navbar
          </Link>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  to="/"
                  className="nav-link active"
                  onClick={(e) => {
                    activeLink(e);
                  }}
                  aria-current="page"
                  onClick={(e) => {
                    activeLink(e);
                  }}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="about"
                  className="nav-link"
                  onClick={(e) => {
                    activeLink(e);
                  }}
                  onClick={(e) => {
                    activeLink(e);
                  }}
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
        {!localStorage.getItem("authToken") ? (
          <div className="btn-group" role="group" aria-label="Basic example">
            <Link to={"signup"} className="btn btn-primary">
              Signup
            </Link>
            <Link to={"login"} className="btn btn-primary mx-2">
              Login
            </Link>
          </div>
        ) : (
          <button onClick={logOutHandler} className="btn btn-danger">
            Logout
          </button>
        )}
      </nav>
    </div>
  );
}
