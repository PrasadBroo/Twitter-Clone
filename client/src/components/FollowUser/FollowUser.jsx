import cogoToast from "cogo-toast";
import { motion } from "framer-motion";
import React from "react";
import { useState } from "react";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { followUser } from "../../services/userServices";
import { SHOW_UNFOLLOW_MODEL } from "../../store/model/modelSlice";
import { selectCurrentUser } from "../../store/user/userSelector";
import TextButton from "../Button/TextButton/TextButton";

export default function FollowUser({ user, type }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const currentUser = selectCurrentUser(state);
  const [followingText, setFollowingText] = useState("Following");
  const [following, setIsFollowing] = useState(user.isFollowing);

  const mutation = useMutation(followUser, {
    onSuccess: () => {
      // Invalidate and refetch
      setIsFollowing(true);
    },
    onError: (error) => {
      cogoToast.error(error.message);
    },
  });

  return (
    <motion.div
      className="follow-user"
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
    >
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
        {!following ? (
          user._id !== currentUser._id && (
            <TextButton
              disabled={mutation.isLoading}
              className="follow-btn"
              onClick={() => mutation.mutate(user._id)}
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
    </motion.div>
  );
}
