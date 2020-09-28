import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactStars from "react-rating-stars-component";

const SearchCards = (props) => {
  const [avgReview, setAvgReview] = useState(0);

  const { channel } = props;

  useEffect(() => {
    axios.get(`/api/ratings/${props.channel.snippet.channelId}`).then((res) => {
      res.data[0].avg === null
        ? setAvgReview(0)
        : setAvgReview(parseInt(res.data[0].avg, 10));
    });
  }, [avgReview]);

  return (
    <div
      className="search-card"
      onClick={(id) => {
        props.reviewChannel(channel.snippet.channelId, channel.snippet.title);
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
          count={5}
          color={"gray"}
          activeColor={"yellow"}
          edit={false}
          value={avgReview}
          console={console.log(channel.snippet.title, avgReview)}
          a11y={true}
          isHalf={true}
          emptyIcon={<i className="far fa-star" />}
          halfIcon={<i className="fa fa-star-half-alt" />}
          filledIcon={<i className="fa fa-star" />}
        />
        <div className="search-description">{channel.snippet.description}</div>
      </div>
    </div>
  );
};

export default SearchCards;
