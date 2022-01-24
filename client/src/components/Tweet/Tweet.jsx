import React from "react";
import ThreeDotsIcon from "../../icons/ThreeDotsIcon";
import profilePic from "../../static/images/profile.jpg";
import CommentIcon from "./../../icons/CommentIcon";
import RetweetIcon from "./../../icons/RetweetIcon";
import ShareIcon from "./../../icons/ShareIcon";
import TextButton from "./../Button/TextButton/TextButton";
import useComponentVisible from "./../../CustomHooks/useComponentVisible";
import classNames from "classnames";
import BookmarkIcon from "../../icons/BookmarkIcon";

export default function Tweet() {
  const {
    ref: tweetOptionsRef,
    isVisible: istweetOptions,
    setIsVisible: settweetOptions,
  } = useComponentVisible(false);
  const {
    ref: retweetRef,
    isVisible: reweetOptonsVisible,
    setIsVisible: setRewteetComponentVisible,
  } = useComponentVisible(false);
  const {
    ref: saveOptionsRef,
    isVisible: saveOptonsVisible,
    setIsVisible: setsaveOptionsComponentVisible,
  } = useComponentVisible(false);
  const showRetweetOptions = () => {
    setRewteetComponentVisible(true);
  };
  const showTweetOptions = () => {
    settweetOptions(true);
  };
  const showSaveTweetOptions = () => {
    setsaveOptionsComponentVisible(true);
  };
  const retweetOptionsClassnames = classNames("retweet-options", {
    show: reweetOptonsVisible,
  });
  const tweetOptionsClassnames = classNames("tweet-options-model", {
    show: istweetOptions,
  });
  const savetweetOptionsClassnames = classNames("tweet-options-model",'save-options', {
    show: saveOptonsVisible,
  });
  return (
    <div className="tweet tweet-container">
      <div className="profile-pic-container">
        <img src={profilePic} alt="user-pic" className="profile-pic" />
      </div>
      <div className="tweet-content">
        <div className="tweet-content-header">
          <span className="tweet-content-child user-full-name">
            Prasad Shinde
          </span>
          <span className="tweet-content-child user-username">@Prasadbro</span>
          <span className="tweet-content-child useless-dot"></span>
          <span className="tweet-content-child timestamp">18h</span>
          <div className="tweet-options-container" ref={tweetOptionsRef}>
            <span
              className="tweet-content-child tweet-options"
              onClick={showTweetOptions}
            >
              <ThreeDotsIcon className="tweet-options-icon" />
            </span>
            <ul className={tweetOptionsClassnames}>
              <li className="tweet-options-model-item">
                <span className="tweet-options-model-icon">
                  <i className="far fa-frown"></i>
                </span>
                <TextButton className="tweet-options-model-btn">
                  Not insterested in this tweet
                </TextButton>
              </li>
              <li className="tweet-options-model-item">
                <span className="tweet-options-model-icon">
                  <i className="fas fa-user-times"></i>
                </span>
                <TextButton className="tweet-options-model-btn">
                  Follow @Prasadbro
                </TextButton>
              </li>
              <li className="tweet-options-model-item">
                <span className="tweet-options-model-icon">
                  <i className="fas fa-ban"></i>
                </span>
                <TextButton className="tweet-options-model-btn">
                  Block @Prasadbro
                </TextButton>
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
          </div>
        </div>
        <div className="tweet-content-text">
          <p className="tweet-text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
            quidem eaque nemo, excepturi similique ex minus natus nam sapiente
            aspernatur. Exercitationem, dignissimos dolorem temporibus delectus
            aliquam vitae, modi, veritatis molestiae nam ipsa nulla dolore
            ipsam. Fuga, velit. Officiis vel debitis labore velit eaque.
            Quisquam, eligendi! Nemo ducimus atque ullam tenetur?
          </p>
        </div>
        <div className="tweet-content-image-container">
          <img
            src="https://pbs.twimg.com/media/FJE0UX-VQAEg34W?format=jpg&name=small"
            alt="tweet-pic"
            className="tweet-content-image"
          />
        </div>
        <div className="tweet-actions">
          <div className=" tweet-actions-child tweet-comment">
            <div className="tweet-icon">
              <CommentIcon fill={"#536471"} height="18px" width="18px" />
            </div>

            <span className="tweet-comment-count">4k</span>
          </div>
          <div className="tweet-actions-child tweet-retweet" ref={retweetRef}>
            <div className="tweet-icon" onClick={showRetweetOptions}>
              <RetweetIcon fill={"#536471"} height="18px" width="18px" />
            </div>
            <div className={retweetOptionsClassnames}>
              <div className="retweet-options-child retweet-btn-container">
                <RetweetIcon fill={"#536471"} height="25px" width="25px" />
                <TextButton className="retweet-btn">Retweet</TextButton>
              </div>
              <div className="retweet-options-child quote-tweet-container">
                <i className="fas fa-pencil-alt"></i>
                <TextButton className="quote-btn">Quote tweet</TextButton>
              </div>
            </div>

            <span className="tweet-comment-count">9.7k</span>
          </div>
          <div className="tweet-actions-child like-tweet">
            <div className="tweet-icon like-icon">
              <i className="far fa-heart"></i>
              {/* <LikeIcon fill={"#536471"} height="18px" width="18px"/> */}
            </div>

            <span className="tweet-comment-count">5.7k</span>
          </div>
          <div className="tweet-actions-child save-tweet-options">
            <div className="tweet-icon tweet-options-container" ref={saveOptionsRef}>
              <ShareIcon fill={"#536471"} height="18px" width="18px" onClick={showSaveTweetOptions}/>
              <ul className={savetweetOptionsClassnames}>
                <li className="tweet-options-model-item">
                  <span className="tweet-options-model-icon">
                    <BookmarkIcon fill={"#536471"} height="18px" width="18px"/>
                  </span>
                  <TextButton className="tweet-options-model-btn">
                    Bookmark
                  </TextButton>
                </li>
                <li className="tweet-options-model-item">
                  <span className="tweet-options-model-icon">
                  <i className="fas fa-link"></i>
                  </span>
                  <TextButton className="tweet-options-model-btn">
                    Copy link to tweet
                  </TextButton>
                </li>
                <li className="tweet-options-model-item">
                  <span className="tweet-options-model-icon">
                  <ShareIcon fill={"#536471"} height="18px" width="18px" />
                  </span>
                  <TextButton className="tweet-options-model-btn">
                    Sharet tweet via
                  </TextButton>
                </li>
                
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
