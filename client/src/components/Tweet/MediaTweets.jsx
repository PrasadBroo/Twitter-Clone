import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserMediaTweets } from "../../store/feed/feedActions";
import { selectUserMediaTweets } from "../../store/feed/feedSelector";
import { selectGuestUser } from "../../store/guest/guestSelector";
import SimpleSpinner from "../Loader/SimpleSpinner";
import Tweet from "./Tweet";

export default function MediaTweets() {
  const state = useSelector((state) => state);
  let guestUser = selectGuestUser(state);
  const tweets = selectUserMediaTweets(state);
  const dispatch = useDispatch();
  const fetching = useSelector((state) => state.feed.mediaTweetsFetching);
  useEffect(() => {
    dispatch(fetchUserMediaTweets(guestUser._id));
  }, [dispatch, guestUser._id]);
  return (
    <>
      <div className="tweets-wrap" style={{ position: "relative" }}>
        {!fetching ? (
          tweets &&
          tweets.map((tweet) => (
            <Tweet tweet={tweet} key={tweet._id}/>
          ))
        ) : (
          <SimpleSpinner topCenter />
        )}
        {!fetching && tweets.length === 0 && (
          <h2>User dont have any tweets :(</h2>
        )}
      </div>
    </>
  );
}
