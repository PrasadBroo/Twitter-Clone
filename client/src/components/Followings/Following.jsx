import cogoToast from "cogo-toast";
import React, { useRef } from "react";
import { useBottomScrollListener } from "react-bottom-scroll-listener";
import {  useDispatch, useSelector } from "react-redux";
import { defaultOffset } from "../../CONSTANTS";
import { getUserFollowings } from "../../services/userServices";

import {
  selectFollowings,
  selectGuestUser,
  selectIsFollowingsFetching,
} from "../../store/guest/guestSelector";
import {  FETCHING_FOLLOWINGS_SUCCESS } from "../../store/guest/guestSlice";
import FollowUser from "../FollowUser/FollowUser";
import SimpleSpinner from "../Loader/SimpleSpinner";

export default function Following() {
  const dispatch = useDispatch()
  const state = useSelector((state) => state);
  const followings = selectFollowings(state);
  const fetching = selectIsFollowingsFetching(state);
  let guestUser = selectGuestUser(state);
  const hasMore = useSelector(state => state.guestUser.hasMoreFollowings)
  const fetchingMoreTweets = useRef(false);

  useBottomScrollListener(async () => {
    if (fetchingMoreTweets.current || fetching  || !hasMore) return
      try {
        fetchingMoreTweets.current = (true);
        const result = await getUserFollowings(guestUser._id,followings.users.length);
        dispatch(FETCHING_FOLLOWINGS_SUCCESS(result))
        fetchingMoreTweets.current = (false);
      } catch (error) {
        fetchingMoreTweets.current = (false);
        cogoToast.error(error.message);
      }
    
  },{offset:defaultOffset});
  return !fetching ? (
    <div className="user-followings">
      {followings.count === 0 && <div className="no-followings">&#x1F60E;</div>}
      {followings.users.map((follower) => (
        <FollowUser user={follower} type='followings' key={follower._id} />
      ))}
    </div>
  ) : (
    <SimpleSpinner topCenter/>
  );
}
