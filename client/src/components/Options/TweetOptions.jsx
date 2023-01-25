import React from "react";
import classNames from "classnames";
import TextButton from "./../Button/TextButton/TextButton";
import { selectCurrentUser } from "../../store/user/userSelector";
import { useSelector } from "react-redux";
import {
  TWEET_USER_FOLLOW_FAILED,
  TWEET_USER_FOLLOW_SUCCESS,
  TWEET_USER_UNFOLLOW_FAILED,
  TWEET_USER_UNFOLLOW_SUCCESS,
} from "../../store/Tweet/tweetSlice";
import { unfollowUser, followUser } from "../../services/userServices";
import cogoToast from "cogo-toast";
import { motion, AnimatePresence } from "framer-motion";

export default function TweetOptions({ istweetOptions, tweet, dispatch }) {
  const tweetOptionsClassnames = classNames("tweet-options-model", {
    show: istweetOptions,
  });
  const state = useSelector((state) => state);
  let currentUser = selectCurrentUser(state);

  const handelTweetDelete = async () => {
    // dispatch(deleteTweet(tweet._id))
  };
  const handelUnfollow = async (e) => {
    e.stopPropagation();
    try {
      dispatch(TWEET_USER_UNFOLLOW_SUCCESS());
      await unfollowUser(tweet.user._id);
    } catch (error) {
      dispatch(TWEET_USER_UNFOLLOW_FAILED());
      cogoToast.error(error.message);
    }
  };
  const handelFollow = async (e) => {
    e.stopPropagation();
    try {
      dispatch(TWEET_USER_FOLLOW_SUCCESS());
      await followUser(tweet.user._id);
    } catch (error) {
      dispatch(TWEET_USER_FOLLOW_FAILED());
      cogoToast.error(error.message);
    }
  };

  return (
    <AnimatePresence>
      {istweetOptions && (
        <motion.ul
          className={tweetOptionsClassnames}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ y: 50, opacity: 0 }}
        >
          <li className="tweet-options-model-item">
            {tweet.user._id !== currentUser._id && (
              <>
                <span className="tweet-options-model-icon">
                  <i className="far fa-frown"></i>
                </span>
                <TextButton className="tweet-options-model-btn">
                  Not insterested in this tweet
                </TextButton>
              </>
            )}
            {tweet.user._id === currentUser._id && (
              <>
                <span className="tweet-options-model-icon danger-icon">
                  <i className="far fa-trash-can"></i>
                </span>
                <TextButton
                  className="tweet-options-model-btn"
                  onClick={handelTweetDelete}
                >
                  Delete
                </TextButton>
              </>
            )}
          </li>
          <li className="tweet-options-model-item">
            {tweet.user._id !== currentUser._id && (
              <>
                <span className="tweet-options-model-icon">
                  <i className="far fa-user-plus"></i>
                </span>
                {!tweet.isFollowing && (
                  <TextButton
                    className="tweet-options-model-btn"
                    onClick={handelFollow}
                  >
                    Follow @{tweet.user.username}
                  </TextButton>
                )}
                {tweet.isFollowing && (
                  <TextButton
                    className="tweet-options-model-btn"
                    onClick={handelUnfollow}
                  >
                    Unfollow @{tweet.user.username}
                  </TextButton>
                )}
              </>
            )}
            {tweet.user._id === currentUser._id && (
              <>
                <span className="tweet-options-model-icon">
                  <i className="far fa-user-plus"></i>
                </span>
                <TextButton className="tweet-options-model-btn" disabled>
                  Change who can reply
                </TextButton>
              </>
            )}
          </li>
          <li className="tweet-options-model-item">
            {tweet.user._id !== currentUser._id && (
              <>
                <span className="tweet-options-model-icon">
                  <i className="far fa-ban"></i>
                </span>
                <TextButton className="tweet-options-model-btn" disabled>
                  Block @{tweet.user.username}
                </TextButton>
              </>
            )}
            {tweet.user._id === currentUser._id && (
              <>
                <span className="tweet-options-model-icon">
                  <i className="fas fa-thumbtack"></i>
                </span>
                <TextButton className="tweet-options-model-btn">
                  Pin to your profile
                </TextButton>
              </>
            )}
          </li>
          <li className="tweet-options-model-item">
            <span className="tweet-options-model-icon icon-4">
              <i className="far fa-flag"></i>
            </span>
            <TextButton className="tweet-options-model-btn" disabled>
              Report Tweet
            </TextButton>
          </li>
        </motion.ul>
      )}
    </AnimatePresence>
  );
}
