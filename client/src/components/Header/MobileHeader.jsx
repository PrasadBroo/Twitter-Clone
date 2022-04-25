import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import HomeIcon from "../../icons/HomeIcon";
import NotificationIcon from "../../icons/NotificationIcon";
import ProfileIcon from "../../icons/ProfileIcon";
import { selectCurrentUser } from "../../store/user/userSelector";

export default function MobileHeader() {
  const state = useSelector((state) => state);
  let user = selectCurrentUser(state);
  return (
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
            <HomeIcon Classname='nav-home-icon'/>
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
    
  );
}
