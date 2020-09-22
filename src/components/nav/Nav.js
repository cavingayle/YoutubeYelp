import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Searchbar from "../searchbar/Searchbar";
import { setUser, logoutUser } from "../../redux/reducer";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const Nav = (props) => {
  const [dropdown, setDropdown] = useState(false);

  useEffect(() => {
    axios.get("/auth/user").then((res) => {
      props.setUser(res.data);
    });
  });

  const handleDropdown = () => {
    setDropdown(!dropdown);
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
        <i className="fas fa-bars hamburger" onClick={handleDropdown}>
          {dropdown ? (
            <>
              <div className="dropdown-box">
                <Link className="home" to={"/"}>Home</Link>
                <Link className="profile" to={"/profile"}>Profile</Link>
                <Link className="login" to={"/login"}>Login</Link>
                <i className="logout" onClick={logout}>Logout</i>
              </div>
            </>
          ) : null}
        </i>
      </nav>
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { logoutUser, setUser })(
  withRouter(Nav)
);
