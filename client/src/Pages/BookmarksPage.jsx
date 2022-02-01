import React from "react";
import { Outlet } from "react-router-dom";
import News from "../components/News/News";
import Searchbar from "../components/Searchbar/Searchbar";
import WhoToFollow from "../components/WhoToFollow/WhoToFollow";

export default function BookmarksPage() {
  return (
    <>
      <div className="bookmarkspage two-flex-col-container">
        <div className="col1 bkc-1">
          <div className="bookamark-header">
            <span className="bookmarks-text">Bookmarks</span>
            <span className="username-text">@prasadbro</span>
          </div>
          <div className="no-bookmarked-tweets">
            <span className="no-tweets-text">
              You haven’t added any Tweets to your Bookmarks yet
            </span>
            <span className="no-tweets-text-two">
              When you do, they’ll show up here.
            </span>
          </div>
        </div>
        <div
          className="col2 follow-sugg-news-container"
        >
          <div className="follow-sugg-news-wrap">
            <Searchbar />
            <News />
            <WhoToFollow />
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
}
