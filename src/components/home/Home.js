
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Spinner from "../spinner/Spinner";
import Searchbar from "../searchbar/Searchbar";


function Home(props) {
  const [reviews, setReviews] = useState([]);
  const [randomChannels, setRandomChannels] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get("/api/recent").then((res) => {
      setReviews(res.data.slice(0,4))
getRandomChannels()
    });
  },[]);

 
  const getRandomChannels = () => {
    setLoading(true)
    axios.get('/api/channels/').then(res => {
      setRandomChannels(res.data.map((a) => ({sort: Math.random(), value: a}))
      .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value).slice(0, 4))
    setLoading(false)
    })
  }



  // filtering the reviews data to remove duplicates 
  const reviewsFilt = reviews.filter( (rev, ind, self) => 
  ind === self.findIndex(t =>(
  t.channel_id === rev.channel_id
  ))
  )



  if (loading === true) {
    return (
      <div className="spinner">
        <Spinner/>
      </div>
    );
  }

  return (
    <div>
      <header>
        <div>Youtube Yelp</div>
        <Searchbar />
      </header>
      <div>
        <div className="genre">Channels To Checkout</div>
        {randomChannels.map(chan => (
          <Link to={`/channel/${chan.youtube_id}`}><div >
            <h2>{chan.title}</h2>
            <div><img src={chan.image} alt="" width='300'/></div>
            </div></Link>
        ))}
        <span></span>
        <div className="recentactivity">
          {reviewsFilt.map((rev,i) => {
            return (
              <Link to={`/channel/${rev.youtube_id}`}> <div key={i}>
                <h2>
                {rev.channel_title}

                </h2>
                <div><img src={rev.image} alt={rev.channel_title} width='300'/></div>
              </div></Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}


export default Home


