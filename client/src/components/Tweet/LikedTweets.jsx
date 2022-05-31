import React, { useEffect } from "react";
import Tweet from "./Tweet";
import { useDispatch, useSelector } from "react-redux";
import { selectGuestUser } from "../../store/guest/guestSelector";

import SimpleSpinner from "../Loader/SimpleSpinner";
import { fetchUserLikedTweets } from "../../store/feed/feedActions";
import {
  selectIsLikedTweetsFetching,
  selectUserLikedTweets,
} from "../../store/feed/feedSelector";
import { useBottomScrollListener } from "react-bottom-scroll-listener";

import {
  CLEAR_LIKED_TWEETS,
} from "../../store/feed/feedSlice";
import AllCaughtUp from "../AllCaughtUp/AllCaughtUp";


export default function LikedTweets() {
  const state = useSelector((state) => state);
  let guestUser = selectGuestUser(state);
  const tweets = selectUserLikedTweets(state);
  const fetching = selectIsLikedTweetsFetching(state);
  const hasMore = useSelector((state) => state.feed.hasMoreLikesTweets);
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch fetch tweets action
    dispatch(fetchUserLikedTweets(guestUser._id));
    return () => dispatch(CLEAR_LIKED_TWEETS());
  }, [dispatch, guestUser._id]);

  useBottomScrollListener(async () => {
    if (!fetching && hasMore) {
      dispatch(fetchUserLikedTweets(guestUser._id, tweets.length));
    }
  });

  return (
    <>
      <div className="tweets-wrap" style={{ position: "relative" }}>
        {fetching && tweets.length === 0 && <SimpleSpinner topCenter />}
        {tweets &&
          tweets.map((tweet) => <Tweet tweet={tweet} key={tweet._id} />)}
        {!hasMore && !fetching && tweets.length !== 0 && <AllCaughtUp />}
        {!fetching && tweets.length === 0 && (
          <h2>@{guestUser.username} dont have any tweets :(</h2>
        )}
      </div>
    </>
  );
}
