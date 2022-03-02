import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFollowers } from "../../store/guest/guestActions";
import {
  selectGuestUser,
  selectFollowers,
  selectIsFollowersFetching,
} from "../../store/guest/guestSelector";
import FollowUser from "../FollowUser/FollowUser";
import SimpleSpinner from "../Loader/SimpleSpinner";

export default function Followers() {
  const state = useSelector((state) => state);
  let guestUser = selectGuestUser(state);
  const followers = selectFollowers(state);
  const fetching = selectIsFollowersFetching(state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFollowers(guestUser._id));
  }, [dispatch, guestUser._id]);
  return !fetching ? (
    <div className="user-followers">
      {followers.users.map((follower) => (
        <FollowUser user={follower} key={follower._id} />
      ))}
    </div>
  ) : (
    <SimpleSpinner />
  );
}
