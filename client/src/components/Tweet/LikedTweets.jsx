import React, { useEffect } from "react";
import Tweet from "./Tweet";
import {  useDispatch, useSelector } from "react-redux";
import { selectGuestUser } from "../../store/guest/guestSelector";
import SimpleSpinner from "../Loader/SimpleSpinner";
import { useBottomScrollListener } from "react-bottom-scroll-listener";
import AllCaughtUp from "../AllCaughtUp/AllCaughtUp";
import { useInfiniteQuery } from "react-query";
import { fetchTheUserLikedTweets } from "../../services/userServices";
import { defaultOffset } from "../../CONSTANTS";
import { SET_TWEET_COUNT } from "../../store/feed/feedSlice";


export default function LikedTweets() {
  const dispatch = useDispatch()
  const state = useSelector((state) => state);
  let guestUser = selectGuestUser(state);
  
  const {
    data: tweets,
    fetchNextPage,
    hasNextPage:hasMore,
    isFetching: fetching,
    error
  } = useInfiniteQuery(
    "liked-tweets",
    ({ pageParam }) => fetchTheUserLikedTweets(guestUser._id, pageParam),
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.tweets.length >= 5) {
          return pages.length * 5;
        }
        return undefined;
      },
      onSuccess:(data)=>{
        dispatch(SET_TWEET_COUNT(data.pages[0].count))
      }
    }
  );

  useEffect(()=>{
    window.scrollTo(0,0)
  },[])

  useBottomScrollListener(async () => {
    if (!fetching && hasMore) {
      fetchNextPage()
    }
  },{offset:defaultOffset});

  return (
    <>
      <div className="tweets-wrap" style={{ position: "relative" }}>
      {fetching && !tweets  && <SimpleSpinner topCenter/>}
        {tweets && tweets.pages.map(page => page.tweets.map(tweet=><Tweet tweet={tweet} key={tweet._id} />) )}

        {!hasMore && !fetching && tweets.pages[0].tweets.length !== 0 && <AllCaughtUp />}
        {!fetching && tweets.pages[0].tweets.length === 0 && (
          <h2>@{guestUser.username} dont have any tweets :(</h2>
        )}
        {error && <h3 className="error-text">{error}</h3>}
      </div>
    </>
  );
}
