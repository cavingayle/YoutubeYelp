import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom'

function Channel(props) {
  const [backend, setBackend] = useState();
  const [channelVids, setChannelVids] = useState();
  const [youtube, setYoutube] = useState({});

  // need to call the backend and get the channel id using the props.location.pathname
  // make another endpoint to call to send back the reviews and channel
  //-- takes in the channel id join reviews and channel
  // send the youtube id from the params to the backend
  // back end will send back the reviews and channel joined
  //
  useEffect(() => {
    axios.get(`/api${props.location.pathname}`).then((res) => {
      setBackend(res.data);
      axios
        .get(
          `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${props.location.pathname.substring(9)}&key=AIzaSyCMLkcQ69lzKP55hhvIwPggxuODybcq6d4`
        )
        .then((res) => {
          setYoutube(res.data.items);
          axios
            .get(
              `https://www.googleapis.com/youtube/v3/search?key=AIzaSyBSb7sSbZgPd653Ny9Dmfa9UxFCJy0wOdQ&channelId=${props.location.pathname.substring(9)}&part=snippet,id&order=date&maxResults=10`
            )
            .then((res) => {
              setChannelVids(res.data.items);
            });
        });
    });
  }, []);



// conditionally set the reviews to render based on if we have any from the backend or show no reviews yet

  return (
    <div>
      {/* <div>{youtube.snippet.title}</div>
      <div>{backend.rating}</div>

      <div>{youtube.snippet.description}</div>
      <div>{youtube.snippet.description}</div>
      <div>{backend.review}</div>
      <div>Videos</div>
      <div>
        {channelVids.map((vid) => (
          <div>
            <Link to={`youtube.com/watch?v=${vid.id.videoId}`}>
                    <img src={vid.snippet.thumbnails.default} alt={vid.snippet.title} />
            </Link>
          </div>
        ))}
      </div> */}
    </div>
  );
}

export default Channel;
