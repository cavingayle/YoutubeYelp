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
        <div>YoutubeYelp</div>
        <Searchbar />
        <div className="dropdown">
          <button className="fas fa-bars hamburger" onClick={handleDropdown}></button>
          {isDown ? (
            <ul className="dropdown-box">
              <li>
                <Link className="home dropdown-btn" to={"/"}>
                  Home
                </Link>
              </li>
              <li>
                <Link className="profile dropdown-btn" to={"/profile"}>
                  Profile
                </Link>
              </li>
              <li>
                <Link className="login dropdown-btn" to={"/login"}>
                  Login
                </Link>
              </li>
              <li>
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
