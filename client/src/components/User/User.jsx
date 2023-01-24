import React, { useEffect, useState } from "react";
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
import Linkify from "linkify-react";
import "linkify-plugin-hashtag";
import "linkify-plugin-mention";
import NotFound from "../NotFound/NotFound";
import { CLEAR_GUEST_USER } from "../../store/guest/guestSlice";
import {motion} from 'framer-motion'
const options = {
  className: () => "default-link",
  formatHref: {
    hashtag: (href) => "/search?c=trend&q=" + encodeURIComponent(href),
    mention: (href) => "/" + href.substr(1),
  },
  format: {
    url: (value) => (value.length > 20 ? value.slice(0, 20) + "…" : value),
    hashtag: (value) => (value.length > 20 ? value.slice(0, 20) + "…" : value),
    mention: (value) => (value.length > 20 ? value.slice(0, 20) + "…" : value),
  },
  target: {
    url: "__blank",
    email: null,
  },
};

const external_link_options = {
  className: () => "default-link",
  format: {
    url: (value) => (value.length > 20 ? value.slice(0, 20) + "…" : value),
  },
  target: {
    url: "__blank",
    email: null,
  },
};
export default function User() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  let currentUser = selectCurrentUser(state);
  let guestUser = selectGuestUser(state);
  const usernotFound = useSelector((state) => state.guestUser.fetchingError);
  const isFetching = selectGuestFetching(state);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { username } = useParams();
  const [backgroundImageLoaded, SetBackgroundImageLoaded] = useState(false);
  const [profileImageLoaded, SetProfileImageLoaded] = useState(false);
  const [followingText, setFollowingText] = useState("Following");
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    document.title = `${currentUser.fullName} (@${currentUser.username}) / Twitter`;
  }, [currentUser.fullName, currentUser.username]);
  useEffect(() => {
    const retriveUser = (username) => {
      dispatch(fetchUser(username));
      // dispatch retrive user action
      // handel success fail
    };
    retriveUser(username);
    return () => dispatch(CLEAR_GUEST_USER());
  }, [username, dispatch]);

  return (
    <div className="two-flex-col-container userpage">
      <motion.div  className="col1 user-section">
        {!isFetching && !usernotFound ? (
          <motion initial={{opacity:0}}
          animate={{opacity:1}}>
            <UserHeader />
            <div className="bc-image-container">
              <img
                src={
                  guestUser.backgroundImage
                    ? guestUser.backgroundImage
                    : "https://via.placeholder.com/700"
                }
                alt="bc-pic"
                style={{ display: backgroundImageLoaded ? "block" : "none" }}
                className="bc-image"
                onLoad={() => SetBackgroundImageLoaded(true)}
              />
              {!backgroundImageLoaded && <SimpleSpinner />}
            </div>
            <motion.div className="user-details">
              <div className="profile-pic-container-two">
                <img
                  src={guestUser.avatar}
                  alt="profile-pic"
                  className="profile-pic"
                  style={{ display: profileImageLoaded ? "block" : "none" }}
                  onLoad={() => SetProfileImageLoaded(true)}
                />
                {!profileImageLoaded && <SimpleSpinner />}
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
                ) : !guestUser.isFollowing ? (
                  <TextButton
                    rounded
                    className="edit-profile-btn"
                    onClick={() =>
                      dispatch(followTheUser(guestUser._id, "profile"))
                    }
                  >
                    Follow
                  </TextButton>
                ) : (
                  <TextButton
                    rounded
                    onMouseEnter={() => setFollowingText("Unfollow")}
                    onMouseLeave={() => setFollowingText("Following")}
                    className="edit-profile-btn following-btn"
                    onClick={() =>
                      dispatch(
                        SHOW_UNFOLLOW_MODEL({
                          user: {
                            username: guestUser.username,
                            _id: guestUser._id,
                          },
                          type: "profile",
                        })
                      )
                    }
                  >
                    {followingText}
                  </TextButton>
                )}
              </div>
              <div className="user-other-details">
                <div className="user-fullname-container container">
                  <span className="user-fullname">
                    {guestUser.fullName}{" "}
                    {guestUser.isVerified && (
                      <span className="verfied-icon">
                        <i className="fas fa-badge-check"></i>
                      </span>
                    )}{" "}
                  </span>
                  <span className="user-username">@{guestUser.username}</span>
                </div>

                <div className="user-description-container container">
                  <span className="user-description">
                    {<Linkify options={options}>{guestUser.bio}</Linkify>}
                  </span>
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
                        <Linkify options={external_link_options}>
                          {guestUser.website}
                        </Linkify>
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
                    <b>{guestUser.followingsCount}</b> Following
                  </Link>
                  <Link to="followers" className="followings-info ">
                    <b>{guestUser.followersCount}</b> Followers
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
                    <span className="custom-border-bottom"></span>
                  </NavLink>
                  <NavLink
                    className={({ isActive }) =>
                      "user-link" + (isActive ? " active-other-link" : "")
                    }
                    to="with_replies"
                  >
                    Tweets & replies
                    <span className="custom-border-bottom"></span>
                  </NavLink>
                  <NavLink
                    className={({ isActive }) =>
                      "user-link" + (isActive ? " active-other-link" : "")
                    }
                    to="media"
                  >
                    Media
                    <span className="custom-border-bottom"></span>
                  </NavLink>
                  <NavLink
                    className={({ isActive }) =>
                      "user-link" + (isActive ? " active-other-link" : "")
                    }
                    to="likes"
                  >
                    Likes
                    <span className="custom-border-bottom"></span>
                  </NavLink>
                </ul>
              </div>
              <div className="user-links-content">
                <Outlet />
              </div>
            </motion.div>
          </motion>
        ) : (
          !usernotFound && <SimpleSpinner topCenter />
        )}
        {usernotFound && !isFetching && <NotFound />}
      </motion.div>
      <div className="col2 follow-news-suggetions">
        <Searchbar
          input={searchQuery}
          setInput={(value) => setSearchQuery(value)}
        />
        <WhoToFollow />
        <News />
      </div>
    </div>
  );
}
