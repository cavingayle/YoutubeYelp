import React, {useEffect, useState} from 'react'

function AddReview() {

 // I need the reviews and I need the corresponding channel 
    // maybe I can use the same endpoint for the channel page and do the same thing where I pull it off the pathname
    // once I get the reviews I will need to map over them 


    return (
        <div>
        <div>Review Title</div>
        <div>Rating</div>
        <div>Review Input area</div>
        <div><button>AddReview</button></div>
        <div>map over reviews</div>

    </div>
    )
}

export default AddReview
