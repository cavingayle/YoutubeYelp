import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { setUser } from "../../redux/reducer";
import Aws from "../aws/Aws";
import ProfileReviews from "./ProfileReviews";

function Profile(props) {
  const [userReviews, setUserReviews] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [editToggle, setEditToggle] = useState(false);
  const [infoToggle, setInfoToggle] = useState(false);

  useEffect(() => {
    props.userId === 0 && props.history.push('/login')
    getUser();
    getUserReview();
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
        getUser();
        setEditToggle(!editToggle);
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
  const getUserReview = () => {
    axios
      .get(`/auth/getReviews/${props.userId}`)
      .then((res) => {
        setUserReviews(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const mappedUserReviews = userReviews.map((el, i) => {
    return <ProfileReviews data={el} key={i} />;
  });

  return (
    <div className="profile-main">
      <h1>
        {firstName} {lastName}'s Profile
      </h1>
      <hr />
      <div className="profile-info">
        <div className="pro-pic-holder">
          {!editToggle ? (
            <div>
              <img alt="Profile Pic" className="profile-pic" src={profilePic} />
            </div>
          ) : (
            <div className="aws-holder">
              <Aws setPic={setProfilePic} profilePic={profilePic} />
            </div>
          )}
        </div>
        {!editToggle ? (
          <div>
            <div>
              <div className="pro-name-holder">
                <h5 className="profile-name">First: {firstName}</h5>
                <h5 className="profile-name">Last: {lastName}</h5>
              </div>
              <div className="pro-info-holder">
                <h5>Username: {username}</h5>
                <h5>Email: {email}</h5>
              </div>
              <button onClick={() => setEditToggle(!editToggle)}>
                Edit Profile
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="pro-name-input-holder">
              <input
                name="firstName"
                placeholder="First Name..."
                value={firstName}
                onChange={handleFirstNameInput}
                className="pro-name-input"
              />
              <input
                name="lastName"
                placeholder="Last Name..."
                value={lastName}
                onChange={handleLastNameInput}
                className="pro-name-input"
              />
            </div>
            <div className='pro-info-input-holder'>
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
            </div>
            <input
              name="profilePic"
              placeholder="Profile Pic URL..."
              value={profilePic}
              onChange={handleProfilePicInput}
              className="profile-pic-input"
            />
            <div className='save-btn-holder'>
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
      <hr />
        <h1>{firstName}'s Reviews</h1>
      <div className='mappedReviews'>
        <hr/>
        {mappedUserReviews}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { setUser })(Profile);
