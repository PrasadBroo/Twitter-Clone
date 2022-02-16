import React from "react";
import {
  useParams,
  NavLink,
  Outlet,
  useLocation,
  Link,
} from "react-router-dom";
import News from "../News/News";
import Searchbar from "../Searchbar/Searchbar";
import WhoToFollow from "../WhoToFollow/WhoToFollow";
import UserHeader from "./UserHeader";
import TextButton from "./../Button/TextButton/TextButton";

export default function User() {
  const { pathname } = useLocation();
  const { username } = useParams();
  console.log(username)
  return (
    <div className="two-flex-col-container userpage">
      <div className="col1 user-section">
        <UserHeader />
        <div className="bc-image-container">
          <img
            src="https://via.placeholder.com/700"
            alt="bc-pic"
            className="bc-image"
          />
        </div>
        <div className="user-details">
          <div className="profile-pic-container-two">
            <img
              src="https://via.placeholder.com/130/blue"
              alt="profile-pic"
              className="profile-pic"
            />
          </div>
          <div className="profile-options">
            <TextButton rounded className="edit-profile-btn">
              Edit profile
            </TextButton>
          </div>
          <div className="user-other-details">
            <div className="user-fullname-container container">
              <span className="user-fullname">
                Prasad Shinde{" "}
                <span className="verfied-icon">
                  <i className="fas fa-badge-check"></i>
                </span>{" "}
              </span>
              <span className="user-username">@Prasadbro</span>
            </div>

            <div className="user-description-container container">
              <span className="user-description">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo
                quas numquam modi nihil aspernatur officia dolore laudantium
                molestias magni, provident
              </span>
            </div>
            <div className="user-sitelink-joindate-container container">
              <div className="user-location">
                <span className="icon-container location-icon">
                  <i className="far fa-map-marker-alt"></i>
                </span>
                <span className="location-text">Bangalore</span>
              </div>
              <div className="sitelink-container ">
                <span className="icon-container link-icon">
                  <i className="fas fa-link"></i>
                </span>
                <a
                  href="http://any.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="default-link"
                >
                  any.com
                </a>
              </div>
              <div className="joindate-container">
                <span className="icon-container calender-icon">
                  <i className="far fa-calendar-alt"></i>
                </span>
                <span className="joindate-text">Joined September 2020</span>
              </div>
            </div>
            <div className="user-follow-container container">
              <Link to="following" className="followings-info ">
                <b>3</b> Following
              </Link>
              <Link to="followers" className="followings-info ">
                <b>3,487</b> Followers
              </Link>
            </div>
          </div>
          <div className="user-other-links">
            <ul className="user-links">
              <NavLink
                className={({ isActive }) =>
                  "user-link " +
                  (isActive ? " active-other-link " : "") +
                  (pathname === "/profile" ? "active-other-link" : null)
                }
                to="tweets"
              >
                Tweets
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  "user-link" + (isActive ? " active-other-link" : "")
                }
                to="with_replies"
              >
                Tweets & replies
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  "user-link" + (isActive ? " active-other-link" : "")
                }
                to="media"
              >
                Media
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  "user-link" + (isActive ? " active-other-link" : "")
                }
                to="likes"
              >
                Likes
              </NavLink>
            </ul>
          </div>
          <div className="user-links-content">
            <Outlet />
          </div>
        </div>
      </div>
      <div className="col2 follow-news-suggetions">
        <Searchbar />
        <WhoToFollow />
        <News />
      </div>
    </div>
  );
}
