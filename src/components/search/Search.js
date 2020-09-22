import React, { useState } from "react";
import { connect } from "react-redux";

const Search = (props) => {
  return (
    <div className="search-main">
      {props.channels.map((channel) => (
        <div>
          <div>
            <img
              src={channel.snippet.thumbnails.default.url}
              alt={channel.snippet.title}
            />
          </div>
          <div>{channel.snippet.title}</div>
          <div>{channel.snippet.description}</div>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Search);
