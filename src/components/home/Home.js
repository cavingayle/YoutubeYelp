import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Search from "../search/Search";
import RecentReviewCard from "../recentReviewCard/RecentReviewCard";

function Home() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getRecentReviews();
  },[]);

  const getRecentReviews = () => {
    axios.get("/api/recent/").then((res) => {
      setReviews(res.data);
    });
  };

  return (
    <div>
      <header>
        <div>Youtube Yelp</div>
        <Search />
      </header>
      <div>
        <div className="genre">Possible Categories</div>
        <div className="recentactivity">
          {reviews.map((rev) => {
            return (
              <div>
                <Link to={`/channel/${rev.channel_id}`}>
                  <RecentReviewCard {...rev} />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
