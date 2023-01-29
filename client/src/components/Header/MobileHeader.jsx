import classNames from "classnames";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import HomeIcon from "../../icons/HomeIcon";
import NotificationIcon from "../../icons/NotificationIcon";
import ProfileIcon from "../../icons/ProfileIcon";
import { HIDE_NAVBAR } from "../../store/navigation/navigationSlice";
import { logout } from "../../store/user/userActions";
import { selectCurrentUser } from "../../store/user/userSelector";
import TextButton from "./../Button/TextButton/TextButton";
import { AnimatePresence, motion } from "framer-motion";
export default function MobileHeader() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.navigation.isNavOpen);
  const state = useSelector((state) => state);
  let user = selectCurrentUser(state);

  const navClasses = classNames("nav-wrap", {
    "nav-active": isOpen,
  });
  const hideNav = () => {
    dispatch(HIDE_NAVBAR());
  };
  return (
    <>
      <div className="wrap-mobile-header">
        <ul className=" header-links mobile-header">
          <NavLink
            to="/home"
            className={({ isActive }) =>
              "header-link" + (isActive ? " active-header-link" : "")
            }
          >
            <div className="header-link-icon-wrap">
              <span className="link-icon">
                <HomeIcon Classname="nav-home-icon" />
              </span>
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
                <i className="far fa-search"></i>
              </span>
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
            </div>
          </NavLink>
        </ul>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={navClasses}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { duration: 0.3, ease: "easeInOut" },
            }}
            exit={{ opacity: 0 }}
          >
            <motion.nav
              className="mobile-nav"
              initial={{ opacity: 0, x: -200 }}
              animate={{
                opacity: 1,
                x: 0,
                transition: { type: "spring", duration: 0.5, bounce: 0.4 },
              }}
              exit={{
                x: "-100%",
                opacity: 0,
                transition: { duration: 0.3, ease: "easeInOut" },
              }}
            >
              <div className="top-header">
                <span className="heading-text">Account Info</span>
                <span
                  className="icon-container"
                  onClick={() => dispatch(HIDE_NAVBAR())}
                >
                  <i className="fa-solid fa-xmark"></i>
                </span>
              </div>
              <div className="user-profile">
                <img src={user.avatar} alt="profile" />
                <span className="fullname">{user.fullName}</span>
                <span className="username">@{user.username}</span>
              </div>
              <div className="follow-info">
                <span className="follow-item">
                  <b>{user.followingsCount}</b> Following
                </span>
                <span className="follow-item">
                  <b>{user.followersCount}</b>Followers
                </span>
              </div>
              <ul className="m-nav-links">
                <Link
                  to={"/" + user.username}
                  className="m-nav-link"
                  onClick={hideNav}
                >
                  <span className="icon-container">
                    <i className="far fa-user"></i>
                  </span>
                  Profile
                </Link>
                <Link to="/home" className="m-nav-link" onClick={hideNav}>
                  <span className="icon-container">
                    <i className="far fa-memo-pad"></i>
                  </span>
                  Lists
                </Link>
                <Link to="/home" className="m-nav-link" onClick={hideNav}>
                  <span className="icon-container">
                    <i className="far fa-user"></i>
                  </span>
                  Topics
                </Link>
                <Link to="/bookmarks" className="m-nav-link" onClick={hideNav}>
                  <span className="icon-container">
                    <i className="far fa-bookmark"></i>
                  </span>
                  Bookmarks
                </Link>
                <Link
                  to="/settings/account"
                  className="m-nav-link"
                  onClick={hideNav}
                >
                  <span className="icon-container">
                    <i className="far fa-gear"></i>
                  </span>
                  Settings and privacy
                </Link>
                <Link
                  to="/settings/display"
                  className="m-nav-link"
                  onClick={hideNav}
                >
                  <span className="icon-container">
                    <i className="far fa-edit"></i>
                  </span>
                  Display
                </Link>
                <TextButton
                  className="m-nav-link logout-btn"
                  onClick={() => dispatch(logout())}
                >
                  Log out
                </TextButton>
              </ul>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
