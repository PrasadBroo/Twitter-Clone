import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet, NavLink } from "react-router-dom";
import News from "../components/News/News";
import Searchbar from "../components/Searchbar/Searchbar";
import WhoToFollow from "../components/WhoToFollow/WhoToFollow";
import { fetchNotifications,fetchMentionsNotifications } from "../store/notification/notificationsActions";

export default function NotificationsPage() {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    dispatch(fetchNotifications());
    dispatch(fetchMentionsNotifications())
  }, [dispatch]);

  return (
    <>
      <div className="notificationspage two-flex-col-container">
        <div className="col1 npc-1">
          <div className="notificationspage-header">
            <span className="notifications-text">Notifications</span>
            <span className="setting-icon-container">
              <i className="far fa-cog"></i>
            </span>
          </div>
          <div className="notifications-links">
            <NavLink
              to=""
              className={({ isActive }) =>
                "user-notification-link" +
                (isActive ? " active-user-notification-link" : "")
              }
            >
              All
              <span className="custom-border-bottom"></span>
            </NavLink>
            <NavLink
              to="mentions"
              className={({ isActive }) =>
                "user-notification-link" +
                (isActive ? " active-user-notification-link" : "")
              }
            >
              Mentions
              <span className="custom-border-bottom"></span>
            </NavLink>
          </div>
          <div className="user-notifications-content">
            <Outlet />
          </div>
        </div>
        <div className="col2 follow-sugg-news-container">
          <div className="follow-sugg-news-wrap">
            <Searchbar input={searchQuery}
              setInput={(value) => setSearchQuery(value)}/>
            <News />
            <WhoToFollow />
          </div>
        </div>
      </div>
    </>
  );
}
