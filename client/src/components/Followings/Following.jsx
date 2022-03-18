import React from "react";
import {  useSelector } from "react-redux";

import {
  selectFollowings,
  selectIsFollowingsFetching,
} from "../../store/guest/guestSelector";
import FollowUser from "../FollowUser/FollowUser";
import SimpleSpinner from "../Loader/SimpleSpinner";

export default function Following() {
  const state = useSelector((state) => state);
  const followings = selectFollowings(state);
  const fetching = selectIsFollowingsFetching(state);

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
