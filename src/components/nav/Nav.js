import React, { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Searchbar from "../searchbar/Searchbar";
import { setUser, logoutUser } from "../redux/reducer";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const Nav = (props) => {
  useEffect(() => {
    props.setUser();
  }, []);

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
      <div>this is the logo</div>
      <Searchbar />
      <div>hamburger menu</div>
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { logoutUser, setUser })(
  withRouter(Nav)
);
