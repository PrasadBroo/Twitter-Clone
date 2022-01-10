import React from "react";
import { Outlet } from "react-router-dom";
import DesktopHeader from "../components/Header/DesktopHeader";
import SendTweet from "../components/Tweet/SendTweet";
import Tweets from "./../components/Tweet/Tweets";

export default function Homepage() {
  return (
    <>
      <div className="homepage">
        <DesktopHeader />
        <main className="main">
          <div className="main-wrapper">
            <div className="container wrap-input-tweets">
              <div className="tweet-input-container">
                <SendTweet />
              </div>
              <div className="tweets">
                <Tweets />
              </div>
            </div>
            <div className="container with-searchbar-suggetions">
              <div className="searchbar"></div>
              <div className="follow-suggetions"></div>
            </div>
          </div>
        </main>
      </div>
      <Outlet />
    </>
  );
}
