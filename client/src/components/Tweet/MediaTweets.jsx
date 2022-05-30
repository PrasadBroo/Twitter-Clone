import cogoToast from "cogo-toast";
import React, { useEffect, useRef } from "react";
import { useBottomScrollListener } from "react-bottom-scroll-listener";
import { useDispatch, useSelector } from "react-redux";
import { defaultOffset } from "../../CONSTANTS";
import { fetchTheUserMediaTweets } from "../../services/userServices";
import { fetchUserMediaTweets } from "../../store/feed/feedActions";
import { selectUserMediaTweets } from "../../store/feed/feedSelector";
import { CLEAR_MEDIA_TWEETS, MEDIA_TWEETS_FETCH_SUCCESS } from "../../store/feed/feedSlice";
import { selectGuestUser } from "../../store/guest/guestSelector";
import AllCaughtUp from "../AllCaughtUp/AllCaughtUp";
import SimpleSpinner from "../Loader/SimpleSpinner";
import Tweet from "./Tweet";

export default function MediaTweets() {
  const state = useSelector((state) => state);
  let guestUser = selectGuestUser(state);
  const hasMore = useSelector((state) => state.feed.hasMoreMediaTweets);
  const tweets = selectUserMediaTweets(state);
  const dispatch = useDispatch();
  const fetching = useSelector((state) => state.feed.mediaTweetsFetching);
  const fetchingMoreTweets = useRef(false);
  useEffect(() => {
    dispatch(fetchUserMediaTweets(guestUser._id));
    return ()=>dispatch(CLEAR_MEDIA_TWEETS())
  }, [dispatch, guestUser._id]);

  useBottomScrollListener(async () => {
    if (fetchingMoreTweets.current || fetching || !hasMore) return;
    try {
      fetchingMoreTweets.current = (true);
      const result = await fetchTheUserMediaTweets(
        guestUser._id,
        tweets.length
      );
      dispatch(MEDIA_TWEETS_FETCH_SUCCESS(result));
      fetchingMoreTweets.current = (false);
    } catch (error) {
      fetchingMoreTweets.current = (false);
      cogoToast.error(error.message);
    }
  },{offset:defaultOffset});

  return (
    <>
      <div className="tweets-wrap" style={{ position: "relative" }}>
        {!fetching ? (
          tweets &&
          tweets.map((tweet) => <Tweet tweet={tweet} key={tweet._id} />)
        ) : (
          <SimpleSpinner topCenter />
        )}
        {!hasMore && !fetching && tweets.length !==0 && <AllCaughtUp />}
        {!fetching && tweets.length === 0 && (
          <h2>@{guestUser.username} dont have any tweets :(</h2>
        )}
      </div>
    </>
  );
}
