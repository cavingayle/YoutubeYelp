
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
    axios.get("/api/recent").then((res) => {
      setReviews(res.data);
    });
  };
    
  console.log(reviews)

  return (
    <div>
      <header>
        <div>Youtube Yelp</div>
        <Search />
      </header>
      <div>
        <div className="genre">Possible Categories</div>
        <div className="recentactivity">
          {reviews.map((rev,i) => {
            return (
              <div key={i}>
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
