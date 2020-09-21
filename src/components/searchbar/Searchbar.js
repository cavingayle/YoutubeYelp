import React, { useState } from "react";
import { getChannelsYT } from "../../redux/reducer";
import { connect } from "react-redux";
import Axios from "axios";

const Searchbar = (props) => {
  const [input, setInput] = useState("");

  const handleInput = (e) => {
    const { value } = e.target;
    setInput(value);
  };

  const handleClearInput = () => {
    setInput("");
  };

  const searchChannels = () => {
    getChannelsYT(input);
  };

  return (
    <div>
      <input onChange={handleInput} value={input} placeholder="Search" />
      <button onClick={searchChannels}>Search</button>
    </div>
  );
};

export default connect(null, {getChannelsYT})(Searchbar);