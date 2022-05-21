import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, NavLink } from "react-router-dom";
import News from "../components/News/News";
import Searchbar from "../components/Searchbar/Searchbar";
import UserHeader from "../components/User/UserHeader";
import WhoToFollow from "../components/WhoToFollow/WhoToFollow";
import { getFollowers,getFollowings } from "../store/guest/guestActions";
import { selectGuestUser } from "../store/guest/guestSelector";
import { CLEAR_FOLLOWINGS,CLEAR_FOLLOWERS } from "../store/guest/guestSlice";

export default function FollowPage() {
  const state = useSelector((state) => state);
  let guestUser = selectGuestUser(state);
  const dispatch = useDispatch();

  useEffect(()=>{
    return ()=> {dispatch(CLEAR_FOLLOWERS());dispatch(CLEAR_FOLLOWINGS())}
  },[dispatch])

  useEffect(() => {
    dispatch(getFollowers(guestUser._id));
    dispatch(getFollowings(guestUser._id))
  }, [dispatch, guestUser._id]);
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
