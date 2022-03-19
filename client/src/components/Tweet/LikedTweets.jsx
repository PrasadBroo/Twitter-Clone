import React, { useEffect } from "react";
import Tweet from "./Tweet";
import { useDispatch, useSelector } from "react-redux";
import {
  selectGuestUser,
} from "../../store/guest/guestSelector";

import SimpleSpinner from "../Loader/SimpleSpinner";
import { fetchUserLikedTweets } from "../../store/feed/feedActions";
import { selectIsLikedTweetsFetching, selectUserLikedTweets } from "../../store/feed/feedSelector";

export default function LikedTweets() {
  const state = useSelector((state) => state);
  let guestUser = selectGuestUser(state);
  const tweets = selectUserLikedTweets(state);
  const fetching = selectIsLikedTweetsFetching(state);
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch fetch tweets action
    dispatch(fetchUserLikedTweets(guestUser._id));
  }, [dispatch, guestUser._id]);
  return (
    <>
      <div className="tweets-wrap" style={{position:'relative'}}>
        {!fetching ? (
          tweets && tweets.map((tweet) => <Tweet tweet={tweet} key={tweet._id} from='likedTweets'/>)
        ) : (
          <SimpleSpinner topCenter/>
        )}
      </div>
    </>
  );
}
