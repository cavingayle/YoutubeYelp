import React, { useState } from "react";
import { connect } from "react-redux";
import axios from 'axios'
const Search = (props) => {




  const reviewChannel = (id) => {
    props.history.push(`/channel/${id}`)
    axios.post('/api/channel', { id })
      .then(res => res.data)
    .catch(err => console.log(err))
}

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
          <button onClick={(id) => reviewChannel(channel.snippet.channelId)}>Review Channel</button>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Search);
