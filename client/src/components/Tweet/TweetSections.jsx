import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import News from "../News/News";
import Searchbar from "../Searchbar/Searchbar";
import SendTweet from "./SendTweet";
import Tweets from "./Tweets";
import WhoToFollow from './../WhoToFollow/WhoToFollow';
import SendTweetHeader from "./SendTweetHeader";

export default function TweetSections() {
  useEffect(()=>{
    document.title = `Home / Twitter`
  },[])
  return (
    <>
      <div className="tweets-search-news-sections two-flex-col-container">
        <div className="col1 tweet-sections container wrap-input-tweets ">
          <SendTweetHeader/>
          <div className="tweet-input-container">
            <SendTweet />
          </div>
          {/* all magic happens here */}
          <div className="tweets">
            {/* <Tweets /> */}
          </div>
        </div>
        <div className="col2 sidebar searchbar-news-sections ">
          <div className="searchbar-news-sections-wrap">
            <Searchbar />
            <News />
            <WhoToFollow/>
          </div>
        </div>
      </div>

      <Outlet />
    </>
  );
}
