import React from "react";

const Video = (props) => {
  const { selectedVideo } = props;

  const videoSrc = `https://www.youtube.com/embed/${selectedVideo}`;

  return (
    <div className="ui embed video-container">
      <iframe
        className="video-player"
        src={videoSrc}
        allowFullScreen
        title="Video player"
      />
    </div>
  );
};

export default Video;
