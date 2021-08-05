import React from "react";
import ReactPlayer from "react-player";
import "./videoPlayer.scss";
import { URL } from "../../../../util"; 

const VideoPlayer = ({ videoBanner }) => {
  return (
    <ReactPlayer
      className={`videoPlay react-player my-20px mb-30px`}
      controls={true}
      light={`${URL.baseUrl}/${videoBanner?.[0]?.image}`}
      muted={true}
      playing={true}
      playIcon={<div /*  className="video-play-button" */></div>}
      url="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
      width="100%"
      style = {{marginBottom:"36px"}}
    />
  );
};

export default VideoPlayer;
