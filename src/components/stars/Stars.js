import React,{useEffect} from 'react'
import ReactStars from "react-rating-stars-component";


function Stars(props) {
    

 
    const secondExample = {
        count: 5,
        color: "gray",
        activeColor: "yellow",
        value: props.rating,
        edit: false,
        a11y: true,
        size: props.size ? props.size : 24,
        isHalf: true,
        emptyIcon: <i className="far fa-star"  />,
        halfIcon: <i className="fa fa-star-half-alt" />,
        filledIcon: <i className="fa fa-star" />,
        
        }
      

    return (
        <>
            <ReactStars {...secondExample} />
        </>
    )
}

export default Stars


