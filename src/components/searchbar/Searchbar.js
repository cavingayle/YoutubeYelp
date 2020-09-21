import React, { useState } from "react";
import { getChannelsYT } from "../../redux/reducer";
import { connect } from "react-redux";

const Searchbar = (props) => {
  const [input, setInput] = useState("");

  const handleInput = (e) => {
    const { value } = e.target;
    setInput(value);
  };

  const searchChannels = () => {
    props.getChannelsYT(input);
    console.log(input)
    console.log(props)
  };

  return (
    <div>
      <input onChange={handleInput} value={input} placeholder="Search" />
      <button onClick={searchChannels}>Search</button>
    </div>
  );
};

const mapStateToProps = (state) => state

export default connect(mapStateToProps, {getChannelsYT})(Searchbar);