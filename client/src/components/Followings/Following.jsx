import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFollowings } from "../../store/guest/guestActions";
import {
  selectFollowings,
  selectGuestUser,
  selectIsFollowingsFetching,
} from "../../store/guest/guestSelector";
import FollowUser from "../FollowUser/FollowUser";
import SimpleSpinner from "../Loader/SimpleSpinner";

export default function Following() {
  const state = useSelector((state) => state);
  let guestUser = selectGuestUser(state);
  const followings = selectFollowings(state);
  const fetching = selectIsFollowingsFetching(state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFollowings(guestUser._id));
  }, [dispatch, guestUser._id]);
  return !fetching ? (
    <div className="user-followings">
      {followings.users.map((follower) => (
        <FollowUser user={follower} key={follower._id} />
      ))}
    </div>
  ) : (
    <SimpleSpinner />
  );
}
