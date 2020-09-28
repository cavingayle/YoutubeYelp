import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactStars from "react-rating-stars-component";

const SearchCards = (props) => {
  const [avgReview, setAvgReview] = useState();
  const [loading, setLoading] = useState(true)

  const { channel } = props;

  useEffect(() => {
    axios.get(`/api/ratings/${props.channel.snippet.channelId}`).then((res) => {
      setAvgReview(+res.data[0].avg)
      setLoading(false)
    });
  }, []);


  const properties = {
    count: 5,
    color: "gray",
    activeColor: "yellow",
    edit: false,
    value: avgReview,
    a11y: true,
    isHalf: true,
    emptyIcon: <i className="far fa-star" />,
    halfIcon: <i className="fa fa-star-half-alt" />,
    filledIcon: <i className="fa fa-star" />,
    onChange: (newValue) => {
      console.log(`Example 2: new value is ${newValue}`);
    }
  }

  console.log('Review Number',avgReview)

  if (loading === true) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  return (
    <div
      className="search-card"
      onClick={(id) => {
        props.reviewChannel(channel.snippet.channelId, channel.snippet.title, channel.snippet.thumbnails.high.url);
      }}
    >
      <div className="search-img-body">
        <img
          src={channel.snippet.thumbnails.high.url}
          alt={channel.snippet.title}
          className="search-img"
        />
      </div>
      <div className="search-info-container">
        <div className="search-title">{channel.snippet.title}</div>
        <ReactStars
          {...properties}
        />
        <div className="search-description">{channel.snippet.description}</div>
      </div>
    </div>
  );
};

export default SearchCards;
