import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import Spinner from "../spinner/Spinner";
import Video from "./Video";

function Channel(props) {
  const [backend, setBackend] = useState([]);
  const [channelVids, setChannelVids] = useState();
  const [youtube, setYoutube] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState("");
  const [reviewAverage, setAverage] = useState(0);

  const id = props.location.pathname.substring(9);
  const api_key = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    axios.get(`/api/reviews/${id}`).then((res) => {
      setBackend(res.data);
      axios
        .get(
          `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${id}&key=${api_key}`
        )
        .then((res) => {
          setYoutube(res.data.items[0]);
          axios
            .get(
              `https://www.googleapis.com/youtube/v3/search?key=${api_key}&channelId=${id}&part=snippet,id&order=date&maxResults=3`
            )
            .then((res) => {
              setChannelVids(res.data.items);
              setLoading(false);
            });
        });
    });
    axios.get(`/api/ratings/${id}`).then((res) => {
      const integer = parseInt(res.data[0].avg, 10);
      setAverage(integer);
    });
  }, []);

  console.log("backend", backend);
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

  const secondExample = {
    count: 5,
    color: "gray",
    activeColor: "yellow",
    edit: false,
    value: reviewAverage,
    a11y: true,
    isHalf: true,
    emptyIcon: <i className="far fa-star" />,
    halfIcon: <i className="fa fa-star-half-alt" />,
    filledIcon: <i className="fa fa-star" />,
    onChange: (newValue) => {
      console.log(`Example 2: new value is ${newValue}`);
    },
  };

  const reviewStars = {
    count: 5,
    color: "gray",
    activeColor: "yellow",
    edit: false,
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

  return (
    <div className="channel-main">
      {selectedVideo ? (
        <div>
          <div className="video-close" onClick={() => setSelectedVideo("")}>
            Close
          </div>
          <Video selectedVideo={selectedVideo} />
        </div>
      ) : null}
      <div></div>
      <div className="channel-header">
        <div className="channel-pic">
          {" "}
          <img src={youtube.snippet.thumbnails.high.url} alt="" />{" "}
        </div>
        <div className="channel-info">
          <div className="channel-title">{youtube.snippet.title}</div>
          <div className="channel-rating">
            Rating {backend.rating}
            <ReactStars {...secondExample} />
          </div>
          <div className="channel-description">
            {youtube.snippet.description.length > 250
              ? youtube.snippet.description.substring(0, 250) + "..."
              : youtube.snippet.description}
          </div>
        </div>
        <div>
          {backend.map((review) => (
            <div className="review-card" key={review.review_id}>
              <h4 className="review-title">{review.title}</h4>
              <ReactStars
                count={5}
                color={"gray"}
                activeColor={"yellow"}
                edit={false}
                value={review.rating}
                a11y={true}
                isHalf={true}
                emptyIcon={<i className="far fa-star" />}
                halfIcon={<i className="fa fa-star-half-alt" />}
                filledIcon={<i className="fa fa-star" />}
              />
              <h6 className="review-description">{review.review}</h6>
            </div>
          ))}
        </div>
      </div>
      <div className="channel-reviews">{backend.review}</div>
      <div>
        <Link className="single-review" to={`/review/${id}`}>
          <button>reviews</button>
        </Link>
      </div>
      <div className="videos-main">
        {channelVids.map((vid) => (
          <div className="video-card" key={vid.id.videoId}>
            <div
              className="video-play"
              onClick={() => setSelectedVideo(vid.id.videoId)}
            >
              <img
                className="video-pic"
                src={vid.snippet.thumbnails.high.url}
                alt={vid.snippet.title}
              />
              <i className="fab fa-youtube logo"></i>
            </div>
            <div className="video-info">
              <h2>{vid.snippet.title}</h2>
              {vid.snippet.description.length > 1000 ? (
                <h6>{vid.snippet.description.substring(0, 1000) + "..."}</h6>
              ) : (
                <h4>{vid.snippet.description}</h4>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Channel;
