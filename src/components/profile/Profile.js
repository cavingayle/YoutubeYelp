import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { setUser } from "../../redux/reducer";

function Profile(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [editToggle, setEditToggle] = useState(false);
  const [infoToggle, setInfoToggle] = useState(false);

  useEffect(() => {
    getUser();
    // setUsername(props.username);
    // setEmail(props.email);
    // setFirstName(props.first_name);
    // setLastName(props.last_name);
    // setProfilePic(props.profile_pic);
  }, []);

  const handleUsernameInput = (e) => {
    setUsername(e.target.value);
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

  const saveEdit = (id, username, email, profilePic, firstName, lastName) => {
    axios
      .put(`/auth/user/${id}`, {
        username,
        email,
        profile_pic: profilePic,
        first_name: firstName,
        last_name: lastName,
      })
      .then((res) => {
        props.setUser(res.data);
        console.log("Hit");
        setEditToggle(!editToggle);
        getUser();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getUser = () => {
    axios
      .get("/auth/user")
      .then((res) => {
        setUsername(res.data.username);
        setEmail(res.data.email);
        setFirstName(res.data.first_name);
        setLastName(res.data.last_name);
        setProfilePic(res.data.profile_pic);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="profile-main">
      <div>
        {!editToggle ? (
          <div>
            <h1>Profile page</h1>
            <h1>Username: {username}</h1>
            <h1>Email: {email}</h1>
            <h1>First name: {firstName}</h1>
            <h1>Last Name: {lastName}</h1>
              <img alt="Profile Pic" className="profile-pic" src={profilePic} />
            <button onClick={() => setEditToggle(!editToggle)}>
              Edit Profile
            </button>
          </div>
        ) : (
          <div>
            <input
              name="username"
              placeholder="Username..."
              value={username}
              onChange={handleUsernameInput}
            />
            <input
              name="email"
              placeholder="Email..."
              value={email}
              onChange={handleEmailInput}
            />
            <input
              name="firstName"
              placeholder="First Name..."
              value={firstName}
              onChange={handleFirstNameInput}
            />
            <input
              name="lastName"
              placeholder="Last Name..."
              value={lastName}
              onChange={handleLastNameInput}
            />
            <input
              name="profilePic"
              placeholder="Profile Pic URL..."
              value={profilePic}
              onChange={handleProfilePicInput}
            />
            <div>
              <button
                onClick={() =>
                  saveEdit(
                    props.userId,
                    username,
                    email,
                    profilePic,
                    firstName,
                    lastName
                  )
                }
              >
                Save
              </button>
              <button onClick={() => setEditToggle(!editToggle)}>
                Go Back
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { setUser })(Profile);
