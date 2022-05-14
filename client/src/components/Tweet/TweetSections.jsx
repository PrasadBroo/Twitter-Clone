import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import News from "../News/News";
import Searchbar from "../Searchbar/Searchbar";
import SendTweet from "./SendTweet";
import WhoToFollow from "./../WhoToFollow/WhoToFollow";
import SendTweetHeader from "./SendTweetHeader";
import { fetchUserFeedTweets } from "../../services/userServices";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/userSelector";
import {
  FEED_TWEETS_FETCH_SUCCESS,
  FEED_TWEETS_FETCHING_STARTED,
  FEED_TWEETS_FETCH_FAILED,
  CLEAR_FEED_TWEETS,
} from "../../store/feed/feedSlice";
import Tweet from "./Tweet";
import SimpleSpinner from "../Loader/SimpleSpinner";
import useWindowSize from "../../CustomHooks/useWindowSize";
import { useBottomScrollListener } from "react-bottom-scroll-listener";
import cogoToast from "cogo-toast";
import AllCaughtUp from "../AllCaughtUp/AllCaughtUp";

export default function TweetSections() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const hasMore = useSelector((state) => state.feed.hasMoreFeedTweets);
  const currentUser = selectCurrentUser(state);
  const feedTweets = useSelector((state) => state.feed.feedTweets);
  const [fetching, setFetching] = useState(true);
  const [fetchingMoreTweets, setFetchingMoreTweets] = useState(false);
  const { width } = useWindowSize();
  useEffect(() => {
    document.title = `Home / Twitter`;
  }, []);
  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        setFetching(true);
        dispatch(FEED_TWEETS_FETCHING_STARTED());
        const tweets = await fetchUserFeedTweets(
          currentUser._id,
          0,
          controller.signal
        );
        dispatch(FEED_TWEETS_FETCH_SUCCESS(tweets));
        setFetching(false);
      } catch (error) {
        dispatch(FEED_TWEETS_FETCH_FAILED(error.message));
        setFetching(false);
      }
    };
    fetchData();

    return () => {
      controller.abort();
      dispatch(CLEAR_FEED_TWEETS());
    };
  }, [currentUser._id, dispatch]);

  useBottomScrollListener(async () => {
    if (!fetchingMoreTweets && hasMore) {
      try {
        setFetchingMoreTweets(true);
        dispatch(FEED_TWEETS_FETCHING_STARTED());
        const tweets = await fetchUserFeedTweets(
          currentUser._id,
          feedTweets.length
        );
        dispatch(FEED_TWEETS_FETCH_SUCCESS(tweets));
        setFetchingMoreTweets(false);
      } catch (error) {
        setFetchingMoreTweets(false);
        cogoToast.error(error.message);
      }
    }
  });
  return (
    <>
      <div className="tweets-search-news-sections two-flex-col-container">
        <div className="col1 tweet-sections container wrap-input-tweets ">
          <SendTweetHeader />
          <div className="tweet-input-container">
            {width > 500 && <SendTweet />}
          </div>
          {/* all magic happens here */}
          <div className="tweets">
            {!fetching &&
              feedTweets.length !== 0 &&
              feedTweets.map((tweet) => (
                <Tweet tweet={tweet} key={tweet._id} />
              ))}
            {!fetching && feedTweets.length === 0 && (
              <WhoToFollow headerText="Suggestion" />
            )}
            {fetching && <SimpleSpinner topCenter />}

            {fetchingMoreTweets && (
              <div className="loading-more-tweets">
                <SimpleSpinner topCenter/>
              </div>
            )}
            {!hasMore && !fetching && <AllCaughtUp />}
          </div>
        </div>
        <div className="col2 sidebar searchbar-news-sections ">
          <div className="searchbar-news-sections-wrap">
            <Searchbar />
            <News />
            <WhoToFollow />
          </div>
        </div>
      </div>

      <Outlet />
    </>
  );
}
