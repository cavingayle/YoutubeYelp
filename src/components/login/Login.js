import React, { useState } from "react";
import axios from "axios";
import { setUser } from "../../redux/reducer";
import { connect } from "react-redux";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [toggle, setToggle] = useState(true);

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

  const login = () => {
    axios
      .post("/auth/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        props.setUser(res.data);
        props.history.push("/");
      })
      .catch((err) => {
        alert("username or password incorrect");
      });
  };

  const register = () => {
    axios
      .post("/auth/register", {
        username: username,
        email: email,
        password: password,
        first_name: firstName,
        last_name: lastName,
        profile_pic: profilePic,
      })
      .then((res) => {
        props.setUser(res.data);
        props.history.push("/");
      })
      .catch((err) => {
        alert("email already registered, do you want to log in?");
      });
  };

  return (
    <div className = 'main-login'>
      <div>
        <h1 className = 'welcome-login'>Sign In</h1>
      </div>
      <hr/>
      <div className='login-info'>
        {toggle ? (
          <div className='login-input'>
            <input
              name="email"
              placeholder="Email..."
              value={email}
              onChange={handleEmailInput}
             
            />
            <input
              name="password"
              placeholder="Password..."
              value={password}
              onChange={handlePasswordInput}
              type="password"
            />
          </div>
        ) : (
          <div className='login-input'>
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
              name="password"
              placeholder="Password..."
              value={password}
              onChange={handlePasswordInput}
              type="password"
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
          </div>
        )}
        {toggle ? (
          <div className='login-btn'>
            <button onClick={login}>Login</button>
            <button
              onClick={() => {
                setToggle(!toggle);
              }}
            >
              Make an Account
            </button>
          </div>
        ) : (
          <div className='login-btn'>
            <button onClick={register}>Register</button>
            <button
              onClick={() => {
                setToggle(!toggle);
              }}
            >
              Go Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { setUser })(Login);
