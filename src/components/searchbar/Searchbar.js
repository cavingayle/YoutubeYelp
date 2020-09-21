import React, { useState } from "react";
import { getChannelsYT } from "../../redux/reducer";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const Searchbar = (props) => {
  const [input, setInput] = useState("");

  const handleInput = (e) => {
    const { value } = e.target;
    setInput(value);
  };

  const searchChannels = () => {
    props.getChannelsYT(input);
    props.history.push("/search")
  };

  return (
    <div>
      <input onChange={handleInput} value={input} placeholder="Search" />
      <button onClick={searchChannels}>Search</button>
    </div>
  );
};

const mapStateToProps = (state) => state

export default connect(mapStateToProps, {getChannelsYT})(withRouter(Searchbar));