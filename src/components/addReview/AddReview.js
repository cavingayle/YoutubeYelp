import React, { useEffect, useState } from 'react'
import axios from 'axios'

function AddReview(props) {

 // I need the reviews and I need the corresponding channel 
    // maybe I can use the same endpoint for the channel page and do the same thing where I pull it off the pathname
    // once I get the reviews I will need to map over them
    
    const [reviews, setReviews] = useState([])
    const [rating, setRating] = useState()

    const id = props.location.pathname.substring(9);

    useEffect(() => {
        axios.get(`api/review/${id}`)
            .then(res => {
            setReviews(res.data)
        }).catch(err=> console.log(err))
    },[])

    const submitReview = () => {
        axios.post()
    }

    return (
        <div>
        <div>Review Title</div>
        <div>Rating</div>
            <div>
                <textarea name="" id="" cols="30" rows="10"></textarea>
            </div>
        <div><button>AddReview</button></div>
        {/* <div>{reviews.map(rev => )}</div> */}

    </div>
    )
}

export default AddReview


const secondExample = {
    count: 5,
    color: "gray",
    activeColor: "yellow",
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