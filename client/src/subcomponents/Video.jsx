import React from "react";
import { Player, BigPlayButton, ControlBar } from "video-react";
import "../../node_modules/video-react/dist/video-react.css";
export default function Video({src}) {
  return (
    <div className="wrap-video">
      <Player 
        src={src}
        width={300}
        height={400}
        fluid={false}
      >
        <BigPlayButton position="center" />
        <ControlBar disableCompletely />
      </Player>
    </div>
  );
}
