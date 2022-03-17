import React, { useEffect } from "react";
import Tweet from "./Tweet";
import { fetchUserTweets } from "../../store/guest/guestActions";
import { useDispatch, useSelector } from "react-redux";
import {
  selectGuestUser,
  selectUserTweets,
} from "../../store/guest/guestSelector";

export default function Tweets() {
  const state = useSelector((state) => state);
  let guestUser = selectGuestUser(state);
  const tweets = selectUserTweets(state);
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch fetch tweets action
    dispatch(fetchUserTweets(guestUser._id));
  }, [dispatch, guestUser._id]);
  return <>{tweets && tweets.map((tweet) => <Tweet tweet={tweet} />)}</>;
}
