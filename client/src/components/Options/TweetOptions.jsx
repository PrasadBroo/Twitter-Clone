import React from "react";
import classNames from "classnames";
import TextButton from "./../Button/TextButton/TextButton";
import { selectCurrentUser } from "../../store/user/userSelector";
import { selectGuestUser } from "../../store/guest/guestSelector";
import { useSelector } from "react-redux";

export default function TweetOptions({ istweetOptions,tweet }) {
  const tweetOptionsClassnames = classNames("tweet-options-model", {
    show: istweetOptions,
  });
  const state = useSelector((state) => state);
  let currentUser = selectCurrentUser(state);
  let guestUser = selectGuestUser(state);
  return (
    <ul className={tweetOptionsClassnames}>
      <li className="tweet-options-model-item">
        {guestUser._id !== currentUser._id && (
          <>
            <span className="tweet-options-model-icon">
              <i className="far fa-frown"></i>
            </span>
            <TextButton className="tweet-options-model-btn">
              Not insterested in this tweet
            </TextButton>
          </>
        )}
        {guestUser._id === currentUser._id && (
          <>
            <span className="tweet-options-model-icon danger-icon">
              <i className="far fa-trash-can"></i>
            </span>
            <TextButton className="tweet-options-model-btn">
              Delete 
            </TextButton>
          </>
        )}
      </li>
      <li className="tweet-options-model-item">
        {guestUser._id !== currentUser._id && <><span className="tweet-options-model-icon">
          <i className="far fa-user-plus"></i>
        </span>
        <TextButton className="tweet-options-model-btn">
          Follow @Prasadbro
        </TextButton></>}
        {guestUser._id === currentUser._id && <><span className="tweet-options-model-icon">
          <i className="far fa-user-plus"></i>
        </span>
        <TextButton className="tweet-options-model-btn">
          Change who can reply
        </TextButton></>}
      </li>
      <li className="tweet-options-model-item">
        {guestUser._id !== currentUser._id &&<><span className="tweet-options-model-icon">
          <i className="far fa-ban"></i>
        </span>
        <TextButton className="tweet-options-model-btn">
          Block @Prasadbro
        </TextButton></>}
        {guestUser._id === currentUser._id &&<><span className="tweet-options-model-icon">
        <i className="fas fa-thumbtack"></i>
        </span>
        <TextButton className="tweet-options-model-btn">
          Pin to your profile
        </TextButton></>}
      </li>
      <li className="tweet-options-model-item">
        <span className="tweet-options-model-icon icon-4">
          <i className="far fa-flag"></i>
        </span>
        <TextButton className="tweet-options-model-btn">
          Report Tweet
        </TextButton>
      </li>
    </ul>
  );
}


