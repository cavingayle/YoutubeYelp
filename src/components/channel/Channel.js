import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import Spinner from "./Spinner";

function Channel(props) {
  const [backend, setBackend] = useState([]);
  const [channelVids, setChannelVids] = useState();
  const [youtube, setYoutube] = useState({});
  const [loading, setLoading] = useState(true);

  const id = props.location.pathname.substring(9);
  const api_key = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    axios.get(`/api${props.location.pathname}`).then((res) => {
      setBackend(res.data);
      axios
        .get(
          `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${id}&key=${api_key}`
        )
        .then((res) => {
          setYoutube(res.data.items[0]);
          axios
            .get(
              `https://www.googleapis.com/youtube/v3/search?key=${api_key}&channelId=${id}&part=snippet,id&order=date&maxResults=10`
            )
            .then((res) => {
              setChannelVids(res.data.items);
              setLoading(false);
            });
        });
    });
  }, []);

  console.log(backend);
  console.log(channelVids);
  console.log(youtube);

  // conditionally set the reviews to render based on if we have any from the backend or show no reviews yet
  if (loading === true) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <div>
        {" "}
        <img src={youtube.snippet.thumbnails.high.url} alt="" />{" "}
      </div>
      <div>{youtube.snippet.title}</div>
          <div>Rating {backend.rating}<ReactStars {...secondExample}/></div>
      <div>
        {youtube.snippet.description === ""
          ? "No Description"
          : youtube.snippet.description}
      </div>
      <div>{backend.review}</div>
      <div>Videos</div>
      <div>
        <Link to={`/review/${id}`}>
          <button>reviews</button>
        </Link>
      </div>
      <div>
        {channelVids.map((vid) => (
          <div>
            <img
              src={vid.snippet.thumbnails.default.url}
              alt={vid.snippet.title}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Channel;

const secondExample = {
    count: 5,
    color: "gray",
    activeColor: "yellow",
    isSelectable: false,
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