import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { SHOW_UNFOLLOW_MODEL } from "../../store/model/modelSlice";
import { followTheUser } from "../../store/user/userActions";
import { selectCurrentUser } from "../../store/user/userSelector";
import TextButton from "../Button/TextButton/TextButton";

export default function FollowUser({ user, type }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const currentUser = selectCurrentUser(state);
  const [followingText, setFollowingText] = useState("Following");
  return (
    <div className="follow-user">
      <div className="wrap-user">
        <div className="profile-pic-container">
          <img src={user.avatar} alt="profile-pic" className="profile-pic" />
        </div>
        <div className="profile-details">
          <Link to={"/" + user.username} className="user-fullname">
            {user.fullName}
            {user.isVerified && (
              <span className="verfied-icon" title="Verified">
                <i className="fas fa-badge-check"></i>
              </span>
            )}
          </Link>
          <span className="user-username">@{user.username}</span>
        </div>
      </div>

      <div className="follow-btn-container">
        {!user.isFollowing ? (
          user._id !== currentUser._id && (
            <TextButton
              className="follow-btn"
              onClick={() => dispatch(followTheUser(user._id, type))}
            >
              Follow
            </TextButton>
          )
        ) : (
          <TextButton
            className="follow-btn unfollowBtn"
            cBlue
            onMouseEnter={() => setFollowingText("Unfollow")}
            onMouseLeave={() => setFollowingText("Following")}
            onClick={() =>
              dispatch(
                SHOW_UNFOLLOW_MODEL({
                  user: { username: user.username, _id: user._id },
                  type,
                })
              )
            }
          >
            {followingText}
          </TextButton>
        )}
      </div>
    </div>
  );
}
