import React from "react";
import { Link } from "react-router-dom";
import ExploreIcon from "../../icons/ExploreIcon";
import HomeIcon from "../../icons/HomeIcon";
import NotificationIcon from "./../../icons/NotificationIcon";
import MessagesIcon from "./../../icons/MessagesIcon";
import BookmarkIcon from "./../../icons/BookmarkIcon";
import MoreIcon from "./../../icons/MoreIcon";
import ProfileIcon from "./../../icons/ProfileIcon";
import ListsIcon from "./../../icons/ListsIcon";
import TextButton from "./../Button/TextButton/TextButton";
import profilePic from "../../static/images/profile.jpg";
import ThreeDotsIcon from "../../icons/ThreeDotsIcon";
import RighttickIcon from "./../../icons/RighttickIcon";

export default function DesktopHeader() {
  return (
    <header className=" desktop-header">
      <div className="sidebar wrap-header-links">
        <div className="header-conatiner header-logo-container logo-container">
          <div className="twitter-logo-container">
            <i className="fab fa-twitter logo"></i>
          </div>
        </div>
        <ul className="header-conatiner header-links">
          <Link to="home" className="header-link">
            <div className="header-link-icon-wrap">
              <span className="link-icon">
                <HomeIcon />
              </span>
              <span className="link-text">Home</span>
            </div>
          </Link>
          <Link to="home" className="header-link">
            <div className="header-link-icon-wrap">
              <span className="link-icon">
                <ExploreIcon />
              </span>
              <span className="link-text">Explore</span>
            </div>
          </Link>
          <Link to="home" className="header-link">
            <div className="header-link-icon-wrap">
              <span className="link-icon">
                <NotificationIcon />
              </span>
              <span className="link-text">Notifications</span>
            </div>
          </Link>
          <Link to="home" className="header-link">
            <div className="header-link-icon-wrap">
              <span className="link-icon">
                <MessagesIcon />
              </span>
              <span className="link-text">Messages</span>
            </div>
          </Link>
          <Link to="home" className="header-link">
            <div className="header-link-icon-wrap">
              <span className="link-icon">
                <BookmarkIcon />
              </span>
              <span className="link-text">Bookmark</span>
            </div>
          </Link>
          <Link to="home" className="header-link">
            <div className="header-link-icon-wrap">
              <span className="link-icon">
                <ListsIcon />
              </span>
              <span className="link-text">Lists</span>
            </div>
          </Link>
          <Link to="home" className="header-link">
            <div className="header-link-icon-wrap">
              <span className="link-icon">
                <ProfileIcon />
              </span>
              <span className="link-text">Profile</span>
            </div>
          </Link>
          <Link to="home" className="header-link">
            <div className="header-link-icon-wrap">
              <span className="link-icon">
                <MoreIcon />
              </span>
              <span className="link-text">More</span>
            </div>
          </Link>
        </ul>
        <div className="header-conatiner tweet-btn-container">
          <TextButton bcBlue rounded className="tweet-btn">
            Tweet
          </TextButton>
        </div>
        <div className="header-profile-wrap">
          <div className="header-container header-profile">
            <div className="profile-pic-container">
              <img src={profilePic} alt="profile-pic" className="profile-pic" />
            </div>
            <div className="profile-details">
              <p className="user-fullname">Prasad Shinde</p>
              <p className="user-username">@Prasadbro</p>
            </div>
            <div className="profile-options">
              <div className="icon-container">
                <ThreeDotsIcon />
              </div>
            </div>
          </div>
          <div className="logout-options ">
            <div className="profile-deatils-wrap header-profile">
              <div className="profile-pic-container">
                <img
                  src={profilePic}
                  alt="profile-pic"
                  className="profile-pic"
                />
              </div>
              <div className="profile-details">
                <p className="user-fullname">Prasad Shinde</p>
                <p className="user-username">@Prasadbro</p>
              </div>
              <div className="profile-options">
                <div className="icon-container">
                  <RighttickIcon />
                </div>
              </div>
            </div>
            <div className="logout-btn-container">
              <TextButton cBlue className="logout-btn">
                Log out @Prasadbro
              </TextButton>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
