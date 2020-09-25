import React, { useEffect, useState } from 'react'
import axios from 'axios'


function RecentReviewCard(props) {

const [data, setData] = useState([])


// useEffect(() => {
//   axios.get(`https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${props.channel_id}&key=AIzaSyCMLkcQ69lzKP55hhvIwPggxuODybcq6d4`)
//       .then(res => {
//         setData(res.data)
//     })
//   }, [])

    return (
      <div>
            {/* <div className='title'>{data.items.snippet.title}</div>
        <div className='image'><img src={data.items.snippet.thumbnails.default.url} alt={data.items.snippet.title}/></div> */}
        </div>
    )
}

export default RecentReviewCard


 
