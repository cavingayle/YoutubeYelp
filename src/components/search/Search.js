import React, { useState } from "react";
import { connect } from "react-redux";
import ReactStars from "react-rating-stars-component";
import axios from 'axios'

const Search = (props) => {
  
  
  const secondExample = {
    count: 5,
    color: "gray",
    activeColor: "yellow",
    value: 0,
    a11y: true,
    isHalf: true,
    emptyIcon: <i className="far fa-star" />,
    halfIcon: <i className="fa fa-star-half-alt" />,
    filledIcon: <i className="fa fa-star" />,
    onChange: newValue => {
      console.log(`Example 2: new value is ${newValue}`);
    }
  };

  const reviewChannel = (id) => {
    props.history.push(`/channel/${id}`)
    axios.post('/api/channel', { id })
      .then(res => res.data)
    .catch(err => console.log(err));
};

  return (
    <div className="search-main">
      {props.channels.map((channel) => (
        <div className="search-card" onClick={(id) => {reviewChannel(channel.snippet.channelId)}}>
          <div className="search-img-body">
            <img
              src={channel.snippet.thumbnails.high.url}
              alt={channel.snippet.title}
              className="search-img"
            />
          </div>
          <div className="search-info-container">
            <div className="search-title">{channel.snippet.title}</div>
            <ReactStars classNames="react-stars" {...secondExample} />
            <div className="search-description">
              {channel.snippet.description}
            </div>
          </div>

        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Search);
