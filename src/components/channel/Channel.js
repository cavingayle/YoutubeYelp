import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import Spinner from "../spinner/Spinner";
import Video from "./Video";
import Pagination from "../search/Pagination";
import _ from "lodash";

function Channel(props) {
  const [backend, setBackend] = useState([]);
  const [channelVids, setChannelVids] = useState();
  const [youtube, setYoutube] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState("");
  const [reviewAverage, setAverage] = useState(0);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(2);

  const id = props.location.pathname.substring(9);
  const api_key = process.env.REACT_APP_API_KEY;
  const api_key2 = process.env.REACT_APP_API_KEY_TWO;

  useEffect(() => {
    axios.get(`/api/reviews/${id}`).then((res) => {
      setBackend(res.data.reverse());
      axios
        .get(
          `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${id}&key=${api_key}`
        )
        .then((res) => {
          setYoutube(res.data.items[0]);
          axios
            .get(
              `https://www.googleapis.com/youtube/v3/search?key=${api_key}&channelId=${id}&part=snippet,id&order=date&maxResults=5`
            )
            .then((res) => {
              setChannelVids(res.data.items);
              setLoading(false);
            });
        })
        .catch((err) =>
          axios
            .get(
              `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${id}&key=${api_key2}`
            )
            .then((res) => {
              setYoutube(res.data.items[0]);
              axios
                .get(
                  `https://www.googleapis.com/youtube/v3/search?key=${api_key2}&channelId=${id}&part=snippet,id&order=date&maxResults=5`
                )
                .then((res) => {
                  setChannelVids(res.data.items);
                  setLoading(false);
                });
            })
        );
    });
    axios.get(`/api/ratings/${id}`).then((res) => {
      const integer = parseInt(res.data[0].avg, 10);
      setAverage(integer);
    });
    setCount(backend.length);
  }, [backend.length]);

  console.log("backend", backend);
  console.log(channelVids);
  console.log(youtube);

  // conditionally set the reviews to render based on if we have any from the backend or show no reviews yet
  if (loading === true) {
    return (
      <div className="spinner">
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

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginate = (items, pageNumber, pageSize) => {
    const startIndex = (pageNumber - 1) * pageSize;
    return _(items).slice(startIndex).take(pageSize).value();
  };

  const cards = paginate(backend, currentPage, pageSize);

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
            {backend.rating}
            <ReactStars {...secondExample} />
          </div>
          <div className="channel-description">
            {youtube.snippet.description.length > 250
              ? youtube.snippet.description.substring(0, 250) + "..."
              : youtube.snippet.description}
          </div>
        </div>
        <div className="review-cards">
          {cards.map((review) => (
            <div className="review-card" key={review.review_id}>
              <div className="review-title">{review.review_title}</div>
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
              <div className="review-description">
                {review.review.length > 150
                  ? review.review.substring(0, 150) + "..."
                  : review.review}
              </div>
            </div>
          ))}
          {/* <div className="paginate-reviews"> */}
          <Pagination
            currentPage={currentPage}
            count={count}
            pageSize={pageSize}
            onPageChange={handlePageChange}
          />
          {/* </div> */}
        </div>
      </div>
      <div className="channel-reviews">{backend.review}</div>
      <div>
        <Link className="single-review" to={`/review/${id}`}>
          <button>Add Review</button>
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
