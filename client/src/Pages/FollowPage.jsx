import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import News from "../components/News/News";
import Searchbar from "../components/Searchbar/Searchbar";
import UserHeader from "../components/User/UserHeader";
import WhoToFollow from "../components/WhoToFollow/WhoToFollow";

export default function FollowPage() {
  return (
    <>
      <div className="followpage two-flex-col-container">
        <div className="col1 fpc-1">
          <div className="followpage-header">
            <UserHeader />
          </div>
          <div className="user-follow-links">
            <NavLink
              to="followers"
              className={({ isActive }) =>
                "user-follow-link" +
                (isActive ? " active-user-follow-link" : "")
              }
            >
              Followers
            </NavLink>
            <NavLink
              to="following"
              className={({ isActive }) =>
                "user-follow-link" +
                (isActive ? " active-user-follow-link" : "")
              }
            >
              Following
            </NavLink>
          </div>
          <div className="user-follow-content">
            <Outlet />
          </div>
        </div>
        <div className="col2 follow-sugg-news-container">
          <div className="follow-sugg-news-wrap">
            <Searchbar />
            <News />
            <WhoToFollow />
          </div>
        </div>
      </div>
    </>
  );
}
