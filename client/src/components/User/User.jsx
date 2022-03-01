import React, { useEffect } from "react";
import {
  useParams,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
  Link,
} from "react-router-dom";
import News from "../News/News";
import Searchbar from "../Searchbar/Searchbar";
import WhoToFollow from "../WhoToFollow/WhoToFollow";
import UserHeader from "./UserHeader";
import TextButton from "./../Button/TextButton/TextButton";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/userSelector";
import moment from "moment";
import { fetchUser } from "../../store/guest/guestActions";
import {
  selectGuestUser,
  selectGuestFetching,
} from "./../../store/guest/guestSelector";
import SimpleSpinner from "../Loader/SimpleSpinner";
import { followTheUser } from "../../store/user/userActions";
import { SHOW_UNFOLLOW_MODEL } from "../../store/model/modelSlice";



export default function User() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  let currentUser = selectCurrentUser(state);
  let guestUser = selectGuestUser(state);
  const isFetching = selectGuestFetching(state);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { username } = useParams();
  useEffect(() => {
    const retriveUser = (username) => {
      dispatch(fetchUser(username));
      // dispatch retrive user action
      // handel success fail
    };
    retriveUser(username);
  }, [username, dispatch]);

  return (
    <div className="two-flex-col-container userpage">
      <div className="col1 user-section">
        {!isFetching ? (
          <>
            <UserHeader />
            <div className="bc-image-container">
              <img
                src={
                  guestUser.backgroundImage
                    ? guestUser.backgroundImage
                    : "https://via.placeholder.com/700"
                }
                alt="bc-pic"
                className="bc-image"
              />
            </div>
            <div className="user-details">
              <div className="profile-pic-container-two">
                <img
                  src={guestUser.avatar}
                  alt="profile-pic"
                  className="profile-pic"
                />
              </div>
              <div className="profile-options">
                {currentUser._id === guestUser._id ? (
                  <TextButton
                    rounded
                    className="edit-profile-btn"
                    onClick={() => navigate("edit/profile")}
                  >
                    Edit profile
                  </TextButton>
                ) :  ( !guestUser.isFollowing ?
                  (<TextButton
                    rounded
                    className="edit-profile-btn"
                    onClick={() => dispatch(followTheUser(guestUser._id))}
                  >
                    Follow
                  </TextButton>) :
                  (<TextButton
                    rounded
                    className="edit-profile-btn"
                    onClick={() => dispatch(SHOW_UNFOLLOW_MODEL(currentUser))}
                  >
                    Following
                  </TextButton>)
                )}
              </div>
              <div className="user-other-details" >
                <div className="user-fullname-container container">
                  <span className="user-fullname">
                    {guestUser.fullName}{" "}
                    <span className="verfied-icon">
                      <i className="fas fa-badge-check"></i>
                    </span>{" "}
                  </span>
                  <span className="user-username">@{guestUser.username}</span>
                </div>

                <div className="user-description-container container">
                  <span className="user-description">{guestUser.bio}</span>
                </div>
                <div className="user-sitelink-joindate-container container">
                  <div className="user-location">
                    <span className="icon-container location-icon">
                      <i className="far fa-map-marker-alt"></i>
                    </span>
                    <span className="location-text">{guestUser.location}</span>
                  </div>
                  <div className="sitelink-container ">
                    {guestUser.website && (
                      <>
                        <span className="icon-container link-icon">
                          <i className="fas fa-link"></i>
                        </span>
                        <a
                          href={guestUser.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="default-link"
                        >
                          {guestUser.website}
                        </a>
                      </>
                    )}
                  </div>
                  <div className="joindate-container">
                    <span className="icon-container calender-icon">
                      <i className="far fa-calendar-alt"></i>
                    </span>
                    <span className="joindate-text">
                      Joined {moment(guestUser.joindate).fromNow()}
                    </span>
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
                      (pathname === "/" + username ? "active-other-link" : null)
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
          </>
        ) : (
          <SimpleSpinner />
        )}
      </div>
      <div className="col2 follow-news-suggetions">
        <Searchbar />
        <WhoToFollow />
        <News />
      </div>
    </div>
  );
}
