import React, { useEffect, useRef } from "react";
import Tweet from "./Tweet";
import { useDispatch, useSelector } from "react-redux";
import {
  selectGuestUser,
} from "../../store/guest/guestSelector";

import SimpleSpinner from "../Loader/SimpleSpinner";
import { fetchUserLikedTweets } from "../../store/feed/feedActions";
import { selectIsLikedTweetsFetching, selectUserLikedTweets } from "../../store/feed/feedSelector";
import { useBottomScrollListener } from "react-bottom-scroll-listener";
import { fetchTheUserLikedTweets } from "../../services/userServices";
import { CLEAR_LIKED_TWEETS, LIKED_TWEETS_FETCH_SUCCESS } from "../../store/feed/feedSlice";
import cogoToast from "cogo-toast";
import AllCaughtUp from "../AllCaughtUp/AllCaughtUp";
import { defaultOffset } from "../../CONSTANTS";

export default function LikedTweets() {
  const state = useSelector((state) => state);
  let guestUser = selectGuestUser(state);
  const tweets = selectUserLikedTweets(state);
  const fetching = selectIsLikedTweetsFetching(state);
  const hasMore = useSelector(state => state.feed.hasMoreLikesTweets)
  const fetchingMoreTweets = useRef(false);
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch fetch tweets action
    dispatch(fetchUserLikedTweets(guestUser._id));
    return ()=>dispatch(CLEAR_LIKED_TWEETS())
  }, [dispatch, guestUser._id]);

  useBottomScrollListener(async () => {
    if (fetchingMoreTweets.current || fetching  || !hasMore) return
      try {
        fetchingMoreTweets.current = (true);
        const result = await fetchTheUserLikedTweets(guestUser._id,tweets.length);
        dispatch(LIKED_TWEETS_FETCH_SUCCESS(result))
        fetchingMoreTweets.current = (false);
      } catch (error) {
        fetchingMoreTweets.current = (false);
        cogoToast.error(error.message);
      }
    
  },{offset:defaultOffset});

  return (
    <>
      <div className="tweets-wrap" style={{position:'relative'}}>
        {!fetching ? (
          tweets && tweets.map((tweet) => <Tweet tweet={tweet} key={tweet._id}/>)
        ) : (
          <SimpleSpinner topCenter/>
        )}
        {!hasMore && !fetching && tweets.length !==0 && <AllCaughtUp />}
        {!fetching && tweets.length === 0 && (
          <h2>@{guestUser.username} dont have any tweets :(</h2>
        )}
      </div>
    </>
  );
}
