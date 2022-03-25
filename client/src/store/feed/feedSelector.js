import { createSelector } from "@reduxjs/toolkit";

const selectFeed = (state)=> state.feed;



export const selectIsTweetsFetching = createSelector(selectFeed,feed => feed.tweetsFetching)
export const selectUserTweets = createSelector(selectFeed,feed => feed.tweets)
export const selectIsLikedTweetsFetching = createSelector(selectFeed,feed => feed.likedTweetFetching)
export const selectUserLikedTweets = createSelector(selectFeed,feed => feed.likedTweets)
export const selectUserMediaTweets = createSelector(selectFeed,feed => feed.mediaTweets)