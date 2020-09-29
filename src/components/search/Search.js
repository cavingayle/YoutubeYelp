import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import Pagination from "./Pagination";
import _ from "lodash";
import SearchCards from "./SearchCards";

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

  const reviewChannel = (id, title, image) => {
    props.history.push(`/channel/${id}`);
    axios
      .post(`/api/channel/${id}`, { title, image })
      .then((res) => res.data)
      .catch((err) => console.log(err));
  };

  const cards = paginate(props.channels, currentPage, pageSize);

  return (
    <div className="search-main">
      {cards.map((channel) => (
        <SearchCards
          key={channel.snippet.channelId}
          channel={channel}
          reviewChannel={reviewChannel}
        />
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
