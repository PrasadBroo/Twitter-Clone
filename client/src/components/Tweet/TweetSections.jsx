import React from "react";
import { Outlet } from "react-router-dom";
import SendTweet from "./SendTweet";
import Tweets from "./Tweets";

export default function TweetSections() {
  return (
    <>
      <div className="tweet-sections container wrap-input-tweets">
        <div className="tweet-input-container">
          <SendTweet />
        </div>
        {/* all magic happens here */}
        <div className="tweets">
          <Tweets />
        </div>
      </div>
      <Outlet/>
    </>
  );
}
