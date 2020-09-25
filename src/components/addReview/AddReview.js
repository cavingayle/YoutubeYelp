import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactStars from "react-rating-stars-component";
import { connect } from "react-redux";
import Spinner from "../spinner/Spinner";

function AddReview(props) {
  // I need the reviews and I need the corresponding channel
  // maybe I can use the same endpoint for the channel page and do the same thing where I pull it off the pathname
  // once I get the reviews I will need to map over them

  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState();
  const [loading, setLoading] = useState(true);
  const [reviewData, setReviewData] = useState({
    title: "",
    review: "",
  });

  const id = props.location.pathname.substring(9);

    useEffect(() => {
      props.userId === 0 && props.history.push('/login')
    axios.get(`api/reviews/${id}`).then((res) => {
      setReviews(res.data);
      axios.get(`/api/ratings/${id}`).then((res) => {
        setTimeout(() => setRating(res.data[0].avg), 500);
        setLoading(false);
      });
    });
  }, []);

  const secondExample = {
    count: 5,
    color: "gray",
    activeColor: "yellow",
    value: rating === null ? 0 : rating,
    a11y: true,
    isHalf: true,
    emptyIcon: <i className="far fa-star" />,
    halfIcon: <i className="fa fa-star-half-alt" />,
    filledIcon: <i className="fa fa-star" />,
    onChange: (newValue) => {
      setRating(newValue);
      console.log(`Example 2: new value is ${newValue}`);
    },
  };

  const submitReview = () => {
    const { title, review } = reviewData;
    axios.post(`/api/review/${id}`, {
      rating,
      title,
      review,
      user_id: props.userId,
    });
  };

  const inputChange = (e) => {
    setReviewData({...reviewData,
      [e.target.name]: e.target.value,
    });
  };

  console.log("REVIEWS", reviews);
  console.log("RATING", rating);
  console.log("REVIEWDATA", reviewData);
  console.log("UserId", props.userId);

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
        <ReactStars {...secondExample} />
      </div>
      <div>
        <input
          onChange={inputChange}
          name="title"
          type="text"
          placeholder="Review Title"
          value={reviewData.title}
        />
      </div>

      <div>
        <textarea
          onChange={inputChange}
          name="review"
          id=""
          cols="30"
          rows="10"
          value={reviewData.review}
        ></textarea>
      </div>
      <div>
        <button onClick={submitReview}>AddReview</button>
      </div>
      {/* <div>{reviews.map(rev => )}</div> */}
    </div>
  );
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, {})(AddReview);
