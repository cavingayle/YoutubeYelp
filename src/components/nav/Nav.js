import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Searchbar from "../searchbar/Searchbar";
import { setUser, logoutUser } from "../../redux/reducer";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const Nav = (props) => {
  const [isDown, setDropdown] = useState(false);

  const handleDropdown = () => {
    setDropdown(!isDown);
    document.addEventListener("click", closeMenu);
  };

  const closeMenu = () => {
    setDropdown(false);
    document.removeEventListener("click", closeMenu);
  };

  const logout = () => {
    axios
      .delete("/auth/logout")
      .then((res) => {
        props.logoutUser();
        props.history.push("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="nav-main">
      <nav className="nav-nav">
        <Link to="/">
          <i className="fab fa-youtube logo"></i>
          <i className="fab fa-yelp yelp-logo"></i>
        </Link>
        <Searchbar />
        <div className="dropdown">
          {isDown ? (
            <button className="fas fa-times" onClick={closeMenu}></button>
          ) : (
            <button
              className="fas fa-bars hamburger"
              onClick={handleDropdown}
            ></button>
          )}
          {isDown ? (
            <ul className="dropdown-box">
              <li onClick={handleDropdown}>
                <Link className="home dropdown-btn" to={"/"}>
                  Home
                </Link>
              </li>
              <li onClick={handleDropdown}>
                <Link className="profile dropdown-btn" to={"/profile"}>
                  Profile
                </Link>
              </li>
              <li onClick={handleDropdown}>
                <Link className="login dropdown-btn" to={"/login"}>
                  Login
                </Link>
              </li>
              <li onClick={handleDropdown}>
                <i className="logout dropdown-btn" onClick={logout}>
                  Logout
                </i>
              </li>
            </ul>
          ) : null}
        </div>
      </nav>
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { logoutUser, setUser })(
  withRouter(Nav)
);
