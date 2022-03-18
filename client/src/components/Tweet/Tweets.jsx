import React, { useEffect } from "react";
import Tweet from "./Tweet";
import { fetchUserTweets } from "../../store/guest/guestActions";
import { useDispatch, useSelector } from "react-redux";
import {
  selectGuestUser,
  selectIsTweetsFetching,
  selectUserTweets,
} from "../../store/guest/guestSelector";
import SimpleSpinner from "../Loader/SimpleSpinner";

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
      <div className="tweets-wrap" style={{position:'relative'}}>
        {!fetching ? (
          tweets && tweets.map((tweet) => <Tweet tweet={tweet} key={tweet._id}/>)
        ) : (
          <SimpleSpinner topCenter/>
        )}
      </div>
    </>
  );
}
