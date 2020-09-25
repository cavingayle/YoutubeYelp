import React from "react";

function ProfileReviews(props) {
  return (
    <div className='pro-review-holder'>
      <p className='pro-review'>Channel: {props.data.channel_id} </p>
      <p className='pro-review'>Title: {props.data.title}</p>
      <p className='pro-review'>Review: {props.data.review}</p>
    </div>
  );
}

export default ProfileReviews;
