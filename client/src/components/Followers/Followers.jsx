import cogoToast from "cogo-toast";
import {  useRef } from "react";
import { useBottomScrollListener } from "react-bottom-scroll-listener";
import {  useDispatch, useSelector } from "react-redux";
import { defaultOffset } from "../../CONSTANTS";
import { getUserFollowers } from "../../services/userServices";

import {
  selectFollowers,
  selectGuestUser,
  selectIsFollowersFetching,
} from "../../store/guest/guestSelector";
import {  FETCHING_FOLLOWERS_SUCCESS } from "../../store/guest/guestSlice";
import FollowUser from "../FollowUser/FollowUser";
import SimpleSpinner from "../Loader/SimpleSpinner";

export default function Followers() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const followers = selectFollowers(state);
  const fetching = selectIsFollowersFetching(state);
  let guestUser = selectGuestUser(state);
  const hasMore = useSelector(state => state.guestUser.hasMoreFollowers)
  const fetchingMoreTweets = useRef(false);


  useBottomScrollListener(async () => {
    if (fetchingMoreTweets.current || fetching  || !hasMore) return
      try {
        fetchingMoreTweets.current = (true);
        const result = await getUserFollowers(guestUser._id,followers.users.length);
        dispatch(FETCHING_FOLLOWERS_SUCCESS(result))
        fetchingMoreTweets.current = (false);
      } catch (error) {
        fetchingMoreTweets.current = (false);
        cogoToast.error(error.message);
      }
    
  },{offset:defaultOffset});

  return !fetching ? (
    <div className="user-followers">
      {followers.count === 0 && <div className="no-followers">No one follows me  &#128532;</div>}
      {followers.users.map((follower) => (
        <FollowUser user={follower} type='followers' key={follower._id} />
      ))}
    </div>
  ) : (
    <SimpleSpinner topCenter/>
  );
}
