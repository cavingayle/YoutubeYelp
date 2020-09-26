import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import ReactStars from "react-rating-stars-component";
import axios from "axios";
import Pagination from "./Pagination";
import _ from "lodash";

const Search = (props) => {
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  useEffect(() => {
    setCount(props.channels.length);
  }, [props.channels.length]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginate = (items, pageNumber, pageSize) => {
    const startIndex = (pageNumber - 1) * pageSize;
    return _(items).slice(startIndex).take(pageSize).value();
  };

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
    onChange: (newValue) => {
      console.log(`Example 2: new value is ${newValue}`);
    },
  };

  const reviewChannel = (id, title, image) => {
    props.history.push(`/channel/${id}`);
    axios
      .post(`/api/channel/${id}`, {title, image})
      .then((res) => res.data)
      .catch((err) => console.log(err));
  };

  const cards = paginate(props.channels, currentPage, pageSize);

  return (
    <div className="search-main">
      {cards.map((channel) => (
        <div
          key={channel.snippet.channelId}
          className="search-card"
          onClick={(id) => {
            reviewChannel(channel.snippet.channelId, channel.snippet.title, channel.snippet.thumbnails.high.url);
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
            <ReactStars classNames="react-stars" {...secondExample} />
            <div className="search-description">
              {channel.snippet.description}
            </div>
          </div>
        </div>
      ))}
      <Pagination
        currentPage={currentPage}
        count={count}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Search);
