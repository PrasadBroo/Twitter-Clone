import React from "react";
import { Outlet } from "react-router-dom";
import News from "../News/News";
import Searchbar from "../Searchbar/Searchbar";
import SendTweet from "./SendTweet";
import Tweets from "./Tweets";

export default function TweetSections() {
  return (
    <>
      <div className="tweets-search-news-sections">
        <div className="tweet-sections container wrap-input-tweets">
          <div className="tweet-input-container">
            <SendTweet />
          </div>
          {/* all magic happens here */}
          <div className="tweets">
            <Tweets />
          </div>
        </div>
        <div className="sidebar searchbar-news-sections">
          <div className="searchbar-news-sections-wrap">
            <Searchbar />
            <News />
          </div>
        </div>
      </div>

      <Outlet />
    </>
  );
}
