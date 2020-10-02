import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Spinner from "../spinner/Spinner";
import Searchbar from "../searchbar/Searchbar";
import Stars from "../stars/Stars";
import { connect } from "react-redux";
import { logoutUser } from "../../redux/reducer";

function Home(props) {
  const [reviews, setReviews] = useState([]);
  const [randomChannels, setRandomChannels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/recent").then((res) => {
      setReviews(res.data.slice(0, 15));
      getRandomChannels();
    });
  }, []);

  const getRandomChannels = () => {
    setLoading(true);
    axios.get("/api/channels/").then((res) => {
      setRandomChannels(
        res.data
          .map((a) => ({ sort: Math.random(), value: a }))
          .sort((a, b) => a.sort - b.sort)
          .map((a) => a.value)
          .slice(0, 4)
      );
      setLoading(false);
    });
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

  // filtering the reviews data to remove duplicates
  const reviewsFilt = reviews.filter(
    (rev, ind, self) =>
      ind === self.findIndex((t) => t.channel_id === rev.channel_id)
  );

  if (loading === true) {
    return (
      <div className="spinner">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="main-home">
      <header>
        <img src="yyred.png" className="home-logo" />
        <h1>YouTube Yelp</h1>
        <ul className="home-links">
          {props.userId === 0 ? (
            <li>
              <Link className="home-link" to={"/login"}>
                Login
              </Link>
            </li>
          ) : (
            <li onClick={logout}>
              <Link className="home-link" to={"/login"}>
                Logout
              </Link>
            </li>
          )}

          <li>
            <Link className="home-link" to={"/profile"}>
              Profile
            </Link>
          </li>
        </ul>
        <div className="home-searchbar">
          <Searchbar />
        </div>
      </header>

      <h1 className="home-text">Random channels to checkout</h1>
      <div className="random-channel-holder">
        {randomChannels.map((chan, i) => {
          return (
            <Link to={`/channel/${chan.youtube_id}`}>
              <div key={i} className="random-channel-card">
                <div className="card-front">
                  <img src={chan.image} alt={chan.channel_title} />
                </div>
                <div className="card-back">
                  <h1>{chan.channel_title}</h1>
                </div>
              </div>
              <div className="phone-card">
                <img src={chan.image} alt={chan.channel_title} />
                <h2>{chan.channel_title}</h2>
              </div>
            </Link>
          );
        })}
      </div>
      <h1 className="home-text RA-text">Recent Activity</h1>
      <div className="recentActivity">
        {reviewsFilt.map((rev, i) => {
          return (
            <Link to={`/channel/${rev.youtube_id}`}>
              <div key={i} className="recent-activity-card">
                <img src={rev.image} alt={rev.channel_title} />
                <h1>{rev.channel_title}</h1>
                <div className="home-stars-holder">
                  <Stars {...rev} />
                </div>
                <h3>{rev.review_title}</h3>
                <h2>{rev.review}</h2>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

const mapStateToprops = (state) => state;

export default connect(mapStateToprops, { logoutUser })(Home);
