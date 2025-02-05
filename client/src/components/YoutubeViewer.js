import React from 'react'
import { Link, useLocation } from "react-router-dom";
import Youtube from 'react-youtube';
import '../App.css';

function YoutubeViewer() {
  const location = useLocation();
  const videoId = location?.state?.videoId;
  const opts = {
    width: '400',
    height: '234',
    playerVars: {
    playsinline: 1,         //インライン再生
    autoplay: 1,            // 自動再生
    } 
  }
  return (
    <>
      <Youtube 
        videoId={videoId} 
        opts={opts}
        className="iframe" 
        containerClassName="youtube"
      />
      <div>
        <Link to={"/youtube"} state={{}}>
          Back
        </Link>
      </div>
    </>
  )
}

export default YoutubeViewer