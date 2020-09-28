
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

  const reviewsFilt = reviews.filter( (rev, ind, self) => 
  ind === self.findIndex(t =>(
  t.channel_id === rev.channel_id
  ))
  )

  console.log('FILTERED REVIEWS',reviewsFilt)

  return (
    <div>
      <header>
        <div>Youtube Yelp</div>
        <Search />
      </header>
      <div>
        <div className="genre">Possible Categories</div>
        <div className="recentactivity">
          {reviewsFilt.map((rev,i) => {
            return (
              <Link to={`/channel/${rev.youtube_id}`}> <div key={i}>
                <div>
                {rev.channel_title}

                </div>
                <div><img src={rev.image} alt={rev.channel_title} width='300'/></div>

              
                
              </div></Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
