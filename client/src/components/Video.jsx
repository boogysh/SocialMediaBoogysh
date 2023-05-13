import React, { useState, useRef } from "react";
import { Waypoint } from "react-waypoint";
// import ReactPlayer from "react-player";

// import cascade from "../../assets/cascade.mp4";

const Video = ({ postImgUrl }) => {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);

  const handleVideoPress = () => {
    if (playing) {
      videoRef.current.pause();
      setPlaying(false);
    } else {
      videoRef.current.play();
      setPlaying(true);
    }
  };

  return (
    <div className="video__player w-full h-auto rounded-[10px] overflow-hidden mb-5">
      <Waypoint onEnter={handleVideoPress} onLeave={handleVideoPress}>
        <video
          className="video__player"
          onClick={handleVideoPress}
          loop
          ref={videoRef}
          src={postImgUrl}
          controls
        ></video>
      </Waypoint>
    </div>
  );
};

export default Video;
