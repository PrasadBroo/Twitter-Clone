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

export default function Tweets() {
  const state = useSelector((state) => state);
  let guestUser = selectGuestUser(state);
  const tweets = selectUserTweets(state);
  const fetching = selectIsTweetsFetching(state);
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch fetch tweets action
    dispatch(fetchUserTweets(guestUser._id));
  }, [dispatch, guestUser._id]);
  return (
    <>
      <div className="tweets-wrap" style={{ position: "relative" }}>
        {!fetching ? (
          tweets &&
          tweets.map((tweet,i) => <Tweet tweet={tweet} key={i} />)
        ) : (
          <SimpleSpinner topCenter />
        )}
        {!fetching && tweets.length===0 && <h2>@{guestUser.username} dont have any tweets :(</h2>}
      </div>
    </>
  );
}
