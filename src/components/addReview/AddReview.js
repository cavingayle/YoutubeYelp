import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactStars from "react-rating-stars-component";
import { connect } from "react-redux";
import Spinner from "../spinner/Spinner";

function AddReview(props) {
 

  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState();
    const [loading, setLoading] = useState(true);
    const [channel, setChannel] = useState()
  const [selectVal, setSelectVal] = useState('Pick a genre')
  const [reviewData, setReviewData] = useState({
    title: "",
    review: "",
  });

  const id = props.location.pathname.substring(8);

    useEffect(() => {
      props.userId === 0 && props.history.push('/login')
    axios.get(`/api/reviews/${id}`).then((res) => {
      setReviews(res.data);
        axios.get(`/api/ratings/${id}`)
        .then((res) => {
          setRating(+res.data[0].avg);
            axios.get(`/api/chan/${id}`)
                .then(res => {
                    setChannel(res.data)
                    setLoading(false);
            })
        
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
      setRating(+newValue.toFixed(1));
      console.log(`Example 2: new value is ${newValue}`);
    },
  };

    
  const submitReview = () => {
      const { title, review } = reviewData;
    if (rating === null) {
      alert('Please leave a star rating')
    } else if (review === '') {
      alert('Please leave a review')
    } else if (title === '') {
      alert('Please give your review a title')
    } else if (channel.genre === null && selectVal === 'Pick a genre') { 
      alert('Give this channel a genre')
    } else {
      axios.post(`/api/review/`, {
        rating: rating,
        title,
          review,
          user_id: props.userId,
        channel_id:channel.channel_id,
        genre: selectVal
      });
        setReviewData({
          title: "",
          review: "", 
        })
        props.history.push(`/channel/${id}`)  
    }
        
      }
        
      
    
  

  const inputChange = (e) => {
    setReviewData({...reviewData,
      [e.target.name]: e.target.value,
    });
  };

  const selectChange = (e) => {
  setSelectVal(e.target.value)
}

  console.log("REVIEWS", reviews);
  console.log("RATING", rating);
  console.log("REVIEWDATA", reviewData);
console.log("UserId", props.userId);
    console.log("channel", channel);
    console.log("SELECT VAL", selectVal);
    

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

      {channel.genre === null && <div>
        Please select a genre for this channel
        <select onChange={selectChange}>
          
            <option value="Pick">Pick a genre </option>
            <option value="animation">Animation</option>
            <option value="conspiracy">Conspiracy</option>
            <option value="comedy">Comedy</option>
            <option value="beauty">Beauty/Fashion</option>
            <option value="vloggers">Vloggers</option>
            <option value="diy">DIY</option>
            <option value="family">Family</option>
            <option value="gaming">Gaming</option>
            <option value="health">Health/Fitness</option>
            <option value="learning">Learning</option>
            <option value="lifestyle">Lifestyle</option>
            <option value="music">Music</option>
            <option value="sports">Sports</option>
            <option value="travel">Travel</option>
            <option value="tech">Tech</option>
            <option value="movies">Movies</option>
            <option value="kids">Kids</option>
            <option value="food">Food</option>
            <option value="political">Political</option>
          </select>
</div>}
      



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
          <div>{reviews.map(rev => (
            <div>
              <div>User: {rev.username}</div>
                  <div>
                      {rev.review_title}
                  </div>
                  <div>
                      {rev.review}
                  </div>
          </div>
      ) )}</div>
    </div>
  )
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, {})(AddReview);
