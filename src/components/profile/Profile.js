import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { setUser } from "../../redux/reducer";

function Profile(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [editToggle, setEditToggle] = useState(false);
  const [infoToggle, setInfoToggle] = useState(false);

  useEffect(() => {}, []);
  console.log(props);
  const handleUsernameInput = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
  };
  const handleEmailInput = (e) => {
    setEmail(e.target.value);
  };
  const handleFirstNameInput = (e) => {
    setFirstName(e.target.value);
  };
  const handleLastNameInput = (e) => {
    setLastName(e.target.value);
  };
  const handleProfilePicInput = (e) => {
    setProfilePic(e.target.value);
  };

  const saveEdit = (username, email, profilePic, firstName, lastName) => {
    axios
      .put(`/auth/player/${props.userId}`, {
        username,
        email,
        profilePic,
        firstName,
        lastName,
      })
      .then((res) => {
        props.setUser(res.data);
        setEditToggle(!editToggle);
      })
      .catch((err) => {
        console.log(err);
      });
  };



  return (
    <div>
      <div>
        <h1>Profile page</h1>
        <h1>Username: {props.username}</h1>
        <h1>Email: {props.email}</h1>
        <h1>Profile Pic URL: {props.profile_pic}</h1>
        <h1>First name: {props.first_name}</h1>
        <h1>Last Name: {props.last_name}</h1>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { setUser })(Profile);
