import React from "react";
import { NavLink, Link } from "react-router-dom";
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
import LinkButton from "./../Button/LinkButton/LinkButton";
import classNames from "classnames";
import useComponentVisible from "./../../CustomHooks/useComponentVisible";

export default function DesktopHeader() {
  const {
    ref: logoutRef,
    isVisible: isLogoutVisible,
    setIsVisible: setLogoutVisible,
  } = useComponentVisible(false);
  const {
    ref: moreOptionsRef,
    isVisible: isMoreOptionVisible,
    setIsVisible: setMoreOptionsVisible,
  } = useComponentVisible(false);
  const moreOptionsClassnames = classNames("more-options", {
    show: isMoreOptionVisible,
  });
  const logoutOptionsClassnames = classNames("logout-options", {
    show: isLogoutVisible,
  });
  const showLogoutOptions = () => {
    setLogoutVisible(true);
  };
  return (
    <header className=" desktop-header">
      <div className="sidebar wrap-header-links">
        <div className="header-conatiner header-logo-container logo-container">
          <div className="twitter-logo-container">
            <i className="fab fa-twitter logo"></i>
          </div>
        </div>
        <ul className="header-conatiner header-links">
          <NavLink
            to="/home"
            className={({ isActive }) =>
              "header-link" + (isActive ? " active-header-link" : "")
            }
          >
            <div className="header-link-icon-wrap">
              <span className="link-icon">
                <HomeIcon fill />
              </span>
              <span className="link-text">Home</span>
            </div>
          </NavLink>
          <NavLink
            to="explore"
            className={({ isActive }) =>
              "header-link" + (isActive ? " active-header-link" : "")
            }
          >
            <div className="header-link-icon-wrap">
              <span className="link-icon">
                <ExploreIcon />
              </span>
              <span className="link-text">Explore</span>
            </div>
          </NavLink>
          <NavLink
            to="notifications"
            className={({ isActive }) =>
              "header-link" + (isActive ? " active-header-link" : "")
            }
          >
            <div className="header-link-icon-wrap">
              <span className="link-icon">
                <NotificationIcon />
              </span>
              <span className="link-text">Notifications</span>
            </div>
          </NavLink>
          <NavLink
            to="messages"
            className={({ isActive }) =>
              "header-link" + (isActive ? " active-header-link" : "")
            }
          >
            <div className="header-link-icon-wrap">
              <span className="link-icon">
                <MessagesIcon />
              </span>
              <span className="link-text">Messages</span>
            </div>
          </NavLink>
          <NavLink
            to="bookmarks"
            className={({ isActive }) =>
              "header-link" + (isActive ? " active-header-link" : "")
            }
          >
            <div className="header-link-icon-wrap">
              <span className="link-icon">
                <BookmarkIcon />
              </span>
              <span className="link-text">Bookmarks</span>
            </div>
          </NavLink>
          <NavLink
            to="lists"
            className={({ isActive }) =>
              "header-link" + (isActive ? " active-header-link" : "")
            }
          >
            <div className="header-link-icon-wrap">
              <span className="link-icon">
                <ListsIcon />
              </span>
              <span className="link-text">Lists</span>
            </div>
          </NavLink>
          <NavLink
            to="profile"
            className={({ isActive }) =>
              "header-link" + (isActive ? " active-header-link" : "")
            }
          >
            <div className="header-link-icon-wrap">
              <span className="link-icon">
                <ProfileIcon />
              </span>
              <span className="link-text">Profile</span>
            </div>
          </NavLink>
          <div className='header-link more-options-container' ref={moreOptionsRef} >
            <div className="header-link-icon-wrap"  onClick={()=>setMoreOptionsVisible(true)}>
              <span className="link-icon">
                <MoreIcon />
              </span>
              <span className="link-text">More</span>
            </div>
            <ul className={moreOptionsClassnames}>
              <Link to="settings/account" className="more-options-link">
                <span className="icon-container">
                  <i className="far fa-cog"></i>
                </span>
                <span className="link-text">Settings and privacy</span>
              </Link>
              <Link to="home" className="more-options-link">
                <span className="icon-container">
                <i className="far fa-edit"></i>
                </span>
                <span className="link-text">Display</span>
              </Link>
              <Link to="home" className="more-options-link">
                <span className="icon-container">
                  <i className="far fa-question-circle"></i>
                </span>
                <span className="link-text">Help Center</span>
              </Link>
            </ul>
          </div>
        </ul>
        <div className="header-conatiner tweet-btn-container">
          <LinkButton
            linkText="Tweet"
            href="compose/tweet"
            className="tweet-btn"
          />
          {/* <TextButton bcBlue rounded className="tweet-btn">
            Tweet
          </TextButton> */}
        </div>
        <div className="header-profile-wrap" ref={logoutRef}>
          <div
            className="header-container header-profile"
            onClick={showLogoutOptions}
          >
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
          <div className={logoutOptionsClassnames}>
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
