import React, { useEffect } from "react";
import Tweet from "./Tweet";
import { fetchUserTweets } from "../../store/feed/feedActions";
import { useDispatch, useSelector } from "react-redux";
import { selectGuestUser } from "../../store/guest/guestSelector";
import SimpleSpinner from "../Loader/SimpleSpinner";
import {
  selectUserTweets,
  selectIsTweetsFetching,
} from "../../store/feed/feedSelector";
import { useBottomScrollListener } from "react-bottom-scroll-listener";


import {
  CLEAR_USER_TWEETS,
} from "../../store/feed/feedSlice";
import AllCaughtUp from "../AllCaughtUp/AllCaughtUp";

export default function Tweets() {
  const state = useSelector((state) => state);
  const hasMore = useSelector((state) => state.feed.hasMoreUserTweets);
  let guestUser = selectGuestUser(state);
  const tweets = selectUserTweets(state);
  const fetching = selectIsTweetsFetching(state);
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch fetch tweets action
    dispatch(fetchUserTweets(guestUser._id));
    return () => dispatch(CLEAR_USER_TWEETS());
  }, [dispatch, guestUser._id]);



  useBottomScrollListener(async () => {
    if (!fetching  && hasMore) {
      dispatch(fetchUserTweets(guestUser._id, tweets.length));
    }
  });

  return (
    <>
      <div className="tweets-wrap" style={{ position: "relative" }}>
        {fetching && tweets.length ===0  && <SimpleSpinner topCenter/>}
        {tweets && tweets.map((tweet, i) => <Tweet tweet={tweet} key={i} />)}

        {!hasMore && !fetching && tweets.length !== 0 && <AllCaughtUp />}
        {!fetching && tweets.length === 0 && (
          <h2>@{guestUser.username} dont have any tweets :(</h2>
        )}
      </div>
    </>
  );
}
