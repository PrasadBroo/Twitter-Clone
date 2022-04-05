import React, { useState } from "react";
import ThreeDotsIcon from "../../icons/ThreeDotsIcon";
import CommentIcon from "./../../icons/CommentIcon";
import RetweetIcon from "./../../icons/RetweetIcon";
import ShareIcon from "./../../icons/ShareIcon";
import TextButton from "./../Button/TextButton/TextButton";
import useComponentVisible from "./../../CustomHooks/useComponentVisible";
import classNames from "classnames";
import Linkify from "linkify-react";
import "linkify-plugin-hashtag";
import "linkify-plugin-mention";
import moment from "moment";
import { likeTweet, unlikeTweet } from "../../store/feed/feedActions";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { SET_TWEET_TYPE } from "../../store/model/modelSlice";
import { postTheRetweet } from "../../services/tweetService";

const options = {
  className: () => "default-link",
  formatHref: {
    hashtag: (href) => "https://twitter.com/hashtag/" + href.substr(1),
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

export default function Tweet({ tweet, from, isParentTweet, className }) {
  const tweetClasses = classNames("tweet-link", className);
  const navigate = useNavigate();
  const [isRetweeting, setIsRetweeting] = useState(false);
  const dispatch = useDispatch();
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
  const showTweetOptions = (e) => {
    e.stopPropagation();
    // OR
    e.preventDefault();
    settweetOptions(true);
  };
  const showSaveTweetOptions = (e) => {
    e.stopPropagation();
    // OR
    e.preventDefault();
    setsaveOptionsComponentVisible(true);
  };
  const retweetOptionsClassnames = classNames("retweet-options", {
    show: reweetOptonsVisible,
  });
  const tweetOptionsClassnames = classNames("tweet-options-model", {
    show: istweetOptions,
  });
  const savetweetOptionsClassnames = classNames(
    "tweet-options-model",
    "save-options",
    {
      show: saveOptonsVisible,
    }
  );

  const handelTweetLike = (e) => {
    e.stopPropagation();
    // OR
    e.preventDefault();
    if (!tweet.isLiked) dispatch(likeTweet(tweet._id, from));
    else {
      dispatch(unlikeTweet(tweet._id, from));
    }
  };
  const handelTweetReply = (e) => {
    e.stopPropagation();
    // OR
    e.preventDefault();
    dispatch(
      SET_TWEET_TYPE({ type: "tweetReply", retweet: null, tweet: tweet })
    );
    navigate("/compose/tweet");
  };
  const handelRetweet = async (e) => {
    // this time uing diffrent method
    e.stopPropagation();
    // OR
    e.preventDefault();
    try {
      setIsRetweeting(true);
      if (!tweet.isRetweeted) {
        await postTheRetweet(tweet._id);
      } else {
        alert("nope");
      }
      setIsRetweeting(false);
    } catch (error) {
      setIsRetweeting(false);
    }
    // dispatch(postRetweet(tweet))
  };
  return (
    <div
      onClick={() =>
        navigate("/" + tweet.user.username + "/status/" + tweet._id)
      }
      className={tweetClasses}
    >
      {tweet.isRetweet && (
        <div className="tweet-retweeted">
          <span className="retweet-icon">
            <RetweetIcon
              fill={"#536471"}
              height="15px"
              width="15px"
              onClick={handelRetweet}
            />
          </span>
          <span className="retweeted-text">You Retweeted</span>
        </div>
      )}
      <div className="tweet tweet-container">
        <div className="profile-pic-container">
          <img src={tweet.user.avatar} alt="user-pic" className="profile-pic" />
        </div>
        {isParentTweet && <span className="hr-line"></span>}
        <div className="tweet-content">
          <div className="tweet-content-header">
            <span className="tweet-content-child user-full-name">
              <Link to={"/" + tweet.user.username}>{tweet.user.fullName}</Link>
            </span>
            <span className="tweet-content-child user-username">
              @{tweet.user.username}
            </span>
            <span className="tweet-content-child useless-dot"></span>
            <span className="tweet-content-child timestamp">
              {moment(tweet.createdAt).fromNow()}
            </span>
            <div className="tweet-options-container" ref={tweetOptionsRef}>
              <TextButton
                onClick={showTweetOptions}
                className="tweet-options-btn"
              >
                <span className="tweet-content-child tweet-options">
                  <ThreeDotsIcon className="tweet-options-icon" />
                </span>
              </TextButton>

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
                    <i className="far fa-user-plus"></i>
                  </span>
                  <TextButton className="tweet-options-model-btn">
                    Follow @Prasadbro
                  </TextButton>
                </li>
                <li className="tweet-options-model-item">
                  <span className="tweet-options-model-icon">
                    <i className="far fa-ban"></i>
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
              {<Linkify options={options}>{tweet.caption}</Linkify>}
            </p>
          </div>
          <div className="tweet-content-image-container">
            {tweet.pic && (
              <img
                src={tweet.pic}
                alt="tweet-pic"
                className="tweet-content-image"
              />
            )}
          </div>
          <div className="tweet-actions">
            <div className=" tweet-actions-child tweet-comment">
              <div className="tweet-icon">
                <TextButton
                  className="tweet-icon-wrap"
                  onClick={handelTweetReply}
                >
                  <CommentIcon fill={"#536471"} height="20px" width="20px" />
                </TextButton>

                {/* <i className="far fa-comment"></i> */}
              </div>

              <span className="tweet-comment-count">{tweet.replyCount}</span>
            </div>
            <div className="tweet-actions-child tweet-retweet" ref={retweetRef}>
              <div className="tweet-icon">
                <TextButton className="tweet-icon-wrap" onClick={handelRetweet}>
                  <RetweetIcon
                    fill={
                      tweet.isRetweeted ? "rgba(29, 155, 240, 0.8)" : "#536471"
                    }
                    height="20px"
                    width="20px"
                  />
                </TextButton>

                {/* <i className="far fa-arrows-retweet"></i> */}
              </div>
              <div className={retweetOptionsClassnames}>
                <div className="retweet-options-child retweet-btn-container">
                  <RetweetIcon fill={"#536471"} height="20px" width="20px" />
                  <TextButton className="retweet-btn">Retweet</TextButton>
                </div>
                <div className="retweet-options-child quote-tweet-container">
                  <i className="fas fa-pencil-alt"></i>
                  <TextButton className="quote-btn">Quote tweet</TextButton>
                </div>
              </div>

              <span className="tweet-comment-count">{tweet.retweetCount}</span>
            </div>
            <div className="tweet-actions-child like-tweet">
              <div className="tweet-icon like-icon">
                <TextButton
                  className="tweet-icon-wrap"
                  onClick={handelTweetLike}
                >
                  <i
                    className={
                      tweet.isLiked ? "fas fa-heart liked" : "fal fa-heart"
                    }
                  ></i>
                </TextButton>

                {/* <LikeIcon fill={"#536471"} height="18px" width="18px"/> */}
              </div>

              <span className="tweet-comment-count">{tweet.likesCount}</span>
            </div>
            <div className="tweet-actions-child save-tweet-options">
              <div
                className="tweet-icon tweet-options-container"
                ref={saveOptionsRef}
              >
                <TextButton
                  onClick={showSaveTweetOptions}
                  className="tweet-options-btn"
                >
                  <ShareIcon fill={"#536471"} height="18px" width="18px" />
                </TextButton>

                <ul className={savetweetOptionsClassnames}>
                  <li className="tweet-options-model-item">
                    <span className="tweet-options-model-icon">
                      <i className="far fa-bookmark"></i>
                    </span>
                    <TextButton className="tweet-options-model-btn">
                      Bookmark
                    </TextButton>
                  </li>
                  <li className="tweet-options-model-item">
                    <span className="tweet-options-model-icon">
                      <i className="far fa-link"></i>
                    </span>
                    <TextButton className="tweet-options-model-btn">
                      Copy link to tweet
                    </TextButton>
                  </li>
                  <li className="tweet-options-model-item">
                    <span className="tweet-options-model-icon">
                      <i className="far fa-share"></i>
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
    </div>
  );
}
