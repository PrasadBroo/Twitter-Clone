import React from "react";
import ShinyIcon from "../../icons/ShinyIcon";

export default function SendTweetHeader() {
  return (
    <div className="send-tweet-heading-wrap">
      <div className="send-tweet-heading">
        <div className="heading-wrap">
          <span className="heading-text">Home</span>
        </div>
        <div className="shiny-icon-container">
          <ShinyIcon />
        </div>
      </div>
    </div>
  );
}
