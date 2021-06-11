import React from 'react';
import ReactPlayer from 'react-player';
import './videoPlayer.scss';
import { LandingVideoPlayerBG } from '../../../../shared/images';
import useVideoPlayer from './VideoPlayerHooks';

const VideoPlayer = () => {
  const {video} = useVideoPlayer();

  return (
    <ReactPlayer
      className="react-player my-20px"
      controls={true}
      light={LandingVideoPlayerBG}
      muted={true}
      playing={true}
      playIcon={<div className="video-play-button"></div>}
      url="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
      width="100%"
    />
  );
};

export default VideoPlayer;
