import React from "react";
import classNames from "classnames";
import TextButton from "./../Button/TextButton/TextButton";
import { selectCurrentUser } from "../../store/user/userSelector";
import { useDispatch, useSelector } from "react-redux";

export default function TweetOptions({ istweetOptions, tweet }) {
  const tweetOptionsClassnames = classNames("tweet-options-model", {
    show: istweetOptions,
  });
  const state = useSelector((state) => state);
  let currentUser = selectCurrentUser(state);
  const dispatch = useDispatch()

  const handelTweetDelete = async()=>{
    // dispatch(deleteTweet(tweet._id))
  }
  return (
    <ul className={tweetOptionsClassnames}>
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
            <TextButton className="tweet-options-model-btn" onClick={handelTweetDelete}>Delete</TextButton>
          </>
        )}
      </li>
      <li className="tweet-options-model-item">
        {tweet.user._id !== currentUser._id && (
          <>
            <span className="tweet-options-model-icon">
              <i className="far fa-user-plus"></i>
            </span>
            {!tweet.isFollowing && <TextButton className="tweet-options-model-btn">
              Follow @{tweet.user.username}
            </TextButton>}
            {tweet.isFollowing && <TextButton className="tweet-options-model-btn">
              Unfollow @{tweet.user.username}
            </TextButton>}
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
    </ul>
  );
}
