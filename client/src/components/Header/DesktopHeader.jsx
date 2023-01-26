import React from "react";
import { NavLink, Link } from "react-router-dom";
import ExploreIcon from "../../icons/ExploreIcon";
import HomeIcon from "../../icons/HomeIcon";
import NotificationIcon from "./../../icons/NotificationIcon";
import MessagesIcon from "./../../icons/MessagesIcon";
import MoreIcon from "./../../icons/MoreIcon";
import ProfileIcon from "./../../icons/ProfileIcon";
import ListsIcon from "./../../icons/ListsIcon";
import TextButton from "./../Button/TextButton/TextButton";
import ThreeDotsIcon from "../../icons/ThreeDotsIcon";
import RighttickIcon from "./../../icons/RighttickIcon";
import LinkButton from "./../Button/LinkButton/LinkButton";
import classNames from "classnames";
import useComponentVisible from "./../../CustomHooks/useComponentVisible";
import { logout } from "../../store/user/userActions";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/userSelector";
import { SET_TWEET_TYPE } from "../../store/model/modelSlice";
import { AnimatePresence, motion } from "framer-motion";

export default function DesktopHeader() {
  const state = useSelector((state) => state);
  let user = selectCurrentUser(state);
  const dispatch = useDispatch();
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
            to="/explore"
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
            to="/notifications"
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
            to="/messages"
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
            to="/bookmarks"
            className={({ isActive }) =>
              "header-link" + (isActive ? " active-header-link" : "")
            }
          >
            <div className="header-link-icon-wrap">
              <span className="link-icon">
                <i className="far fa-bookmark"></i>
              </span>
              <span className="link-text">Bookmarks</span>
            </div>
          </NavLink>
          <NavLink
            to="/lists"
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
            to={"/" + user.username}
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
          <div
            className="header-link more-options-container"
            ref={moreOptionsRef}
          >
            <div
              className="header-link-icon-wrap"
              onClick={() => setMoreOptionsVisible(true)}
            >
              <span className="link-icon">
                <MoreIcon />
              </span>
              <span className="link-text">More</span>
            </div>
            <AnimatePresence>
              {isMoreOptionVisible && (
                <motion.ul
                  className={moreOptionsClassnames}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ y: -50, opacity: 0 }}
                >
                  <Link to="/settings/account" className="more-options-link">
                    <span className="icon-container">
                      <i className="far fa-cog"></i>
                    </span>
                    <span className="link-text-two">Settings and privacy</span>
                  </Link>
                  <Link to="/display" className="more-options-link">
                    <span className="icon-container">
                      <i className="far fa-edit"></i>
                    </span>
                    <span className="link-text-two">Display</span>
                  </Link>
                  <Link to="/help" className="more-options-link">
                    <span className="icon-container">
                      <i className="far fa-question-circle"></i>
                    </span>
                    <span className="link-text-two">Help Center</span>
                  </Link>
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </ul>
        <div className="header-conatiner tweet-btn-container">
          <LinkButton
            linkText="Tweet"
            href="/compose/tweet"
            className="tweet-btn"
            onClick={() =>
              dispatch(
                SET_TWEET_TYPE({ type: "tweet", retweet: null, tweet: null })
              )
            }
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
              <img
                src={user.avatar}
                alt="profile-pic"
                className="profile-pic"
              />
            </div>
            <div className="profile-details">
              <p className="user-fullname">{user.fullName}</p>
              <p className="user-username">@{user.username}</p>
            </div>
            <div className="profile-options">
              <div className="icon-container">
                <ThreeDotsIcon />
              </div>
            </div>
          </div>
          <AnimatePresence>
            {isLogoutVisible && (
              <motion.div
                className={logoutOptionsClassnames}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ y: -50, opacity: 0 }}
              >
                <div className="profile-deatils-wrap header-profile">
                  <div className="profile-pic-container">
                    <img
                      src={user.avatar}
                      alt="profile-pic"
                      className="profile-pic"
                    />
                  </div>
                  <div className="profile-details">
                    <p className="user-fullname">{user.fullName}</p>
                    <p className="user-username">@{user.username}</p>
                  </div>
                  <div className="profile-options">
                    <div className="icon-container">
                      <RighttickIcon />
                    </div>
                  </div>
                </div>
                <div className="logout-btn-container">
                  <TextButton
                    cBlue
                    className="logout-btn"
                    onClick={() => dispatch(logout())}
                  >
                    Log out @{user.username}
                  </TextButton>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
