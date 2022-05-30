import React, { useEffect, useReducer } from "react";
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
import {  useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { SET_TWEET_TYPE } from "../../store/model/modelSlice";
import {
  deleteTheRetweet,
  likeTheTweet,
  unlikeTheTweet,
  postTheRetweet,
} from "../../services/tweetService";
import TweetOptions from "../Options/TweetOptions";
import { selectCurrentUser } from "../../store/user/userSelector";
import { selectGuestUser } from "../../store/guest/guestSelector";
import tweetReducer, {
  initialState,
  FETCHING_TWEET_SUCCESS,
  TWEET_LIKED_SUCCESS,
  TWEET_LIKED_FAILED,
  TWEET_RETWEETED_SUCCESS,
  TWEET_RETWEETED_FAILED,
} from "../../store/Tweet/tweetSlice";

const options = {
  className: () => "default-link",
  formatHref: {
    hashtag: (href) => "/explore?hashtag=" + href.substr(1),
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

export default function Tweet({
  tweet: propTweet,
  isParentTweet,
  className,
  newlook
}) {
  const state = useSelector((state) => state);
  const currentUser = selectCurrentUser(state);
  const guestUser = selectGuestUser(state);
  const tweetClasses = classNames("tweet-link", className);
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const [{ tweet, fetching }, dispatch] = useReducer(
    tweetReducer,
    initialState
  );
  useEffect(() => {
    if (propTweet) {
      dispatch(FETCHING_TWEET_SUCCESS(propTweet));
    }
  }, [propTweet]);
  const {
    ref: tweetOptionsRef,
    isVisible: istweetOptions,
    setIsVisible: settweetOptions,
  } = useComponentVisible(false);
  const { ref: retweetRef, isVisible: reweetOptonsVisible } =
    useComponentVisible(false);
  const {
    ref: saveOptionsRef,
    isVisible: saveOptonsVisible,
    setIsVisible: setsaveOptionsComponentVisible,
  } = useComponentVisible(false);
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

  const savetweetOptionsClassnames = classNames(
    "tweet-options-model",
    "save-options",
    {
      show: saveOptonsVisible,
    }
  );

  const handelTweetLike = async (e) => {
    e.stopPropagation();
    // OR
    e.preventDefault();
    if (!tweet.isLiked) {
      dispatch(TWEET_LIKED_SUCCESS());
      await likeTheTweet(tweet._id);
    } else {
      dispatch(TWEET_LIKED_FAILED());
      await unlikeTheTweet(tweet._id);
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

    if (!tweet.isRetweeted) {
      try {
        dispatch(TWEET_RETWEETED_SUCCESS());
        await postTheRetweet(tweet._id);
      } catch (error) {
        dispatch(TWEET_RETWEETED_FAILED());
      }
    } else {
      try {
        dispatch(TWEET_RETWEETED_FAILED());
        await deleteTheRetweet(tweet._id);
      } catch (error) {
        dispatch(TWEET_RETWEETED_SUCCESS());
      }
    }

    // dispatch(postRetweet(tweet))
  };
  return !fetching ? (
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
          <span className="retweeted-text">
            {currentUser._id === guestUser._id
              ? "You Retweeted"
              : guestUser.username + " Retweeted"}
          </span>
        </div>
      )}
      <div className="tweet tweet-container">
        <div className="profile-pic-container">
          <img src={tweet.user.avatar} alt="user-pic" className="profile-pic" />
        </div>
        {isParentTweet && <span className="hr-line"></span>}
        <div className="tweet-content">
          <div className="tweet-content-header">
            <div className="tweet-header-child">
              <span className="tweet-content-child user-full-name">
              <Link
                to={"/" + tweet.user.username}
                onClick={(e) => e.stopPropagation()}
              >
                {tweet.user.fullName}
                {tweet.user.isVerified && (
                  <span className="verfied-icon">
                    <i className="fas fa-badge-check"></i>
                  </span>
                )}
              </Link>
            </span>
            <span className="tweet-content-child user-username">
              @{tweet.user.username}
            </span>
            <span className="tweet-content-child useless-dot"></span>
            <span className="tweet-content-child timestamp">
              {moment(tweet.createdAt).fromNow()}
            </span>
            </div>
            
            <div className="tweet-options-container" ref={tweetOptionsRef}>
              <TextButton
                onClick={showTweetOptions}
                className="tweet-options-btn"
              >
                <span className="tweet-content-child tweet-options">
                  <ThreeDotsIcon className="tweet-options-icon"/>
                </span>
              </TextButton>

              <TweetOptions istweetOptions={istweetOptions} tweet={tweet} dispatch={dispatch} />
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
          {!newlook && <div className="tweet-actions">
            <div className="wrap-tweet-actions-child">
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
              <div
                className="tweet-actions-child tweet-retweet"
                ref={retweetRef}
              >
                <div className="tweet-icon">
                  <TextButton
                    className="tweet-icon-wrap"
                    onClick={handelRetweet}
                  >
                    <RetweetIcon
                      fill={
                        tweet.isRetweeted
                          ? "rgba(29, 155, 240, 0.8)"
                          : "#536471"
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

                <span className="tweet-comment-count">
                  {tweet.retweetCount}
                </span>
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
          </div>}
        </div>
      </div>
      {newlook &&<div className="tweet-info">
        <Link to='retweets' className="tweet-info-link"><b>{tweet.retweetCount}</b> Retweets</Link>
        <Link to='quote-tweets' className="tweet-info-link"><b>{tweet.retweetCount}</b> Quote Retweets</Link>
        <Link to='likes' className="tweet-info-link"><b>{tweet.likesCount}</b> Likes</Link>
      </div>}
      {newlook && <div className="tweet-actions tweet-actions-new-look">
            <div className="wrap-tweet-actions-child">
              <div className=" tweet-actions-child tweet-comment">
                <div className="tweet-icon">
                  <TextButton
                    className="tweet-icon-wrap"
                    onClick={handelTweetReply}
                  >
                    <CommentIcon fill={"#536471"} height="25px" width="25px" />
                  </TextButton>

                  {/* <i className="far fa-comment"></i> */}
                </div>

                {/* <span className="tweet-comment-count">{tweet.replyCount}</span> */}
              </div>
              <div
                className="tweet-actions-child tweet-retweet"
                ref={retweetRef}
              >
                <div className="tweet-icon">
                  <TextButton
                    className="tweet-icon-wrap"
                    onClick={handelRetweet}
                  >
                    <RetweetIcon
                      fill={
                        tweet.isRetweeted
                          ? "rgba(29, 155, 240, 0.8)"
                          : "#536471"
                      }
                      height="25px"
                      width="25px"
                    />
                  </TextButton>

                  {/* <i className="far fa-arrows-retweet"></i> */}
                </div>

                {/* <span className="tweet-comment-count">
                  {tweet.retweetCount}
                </span> */}
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

                {/* <span className="tweet-comment-count">{tweet.likesCount}</span> */}
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
                  <ShareIcon fill={"#536471"} height="25px" width="25px" />
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

            
          </div>}
    </div>
  ) : null;
}
