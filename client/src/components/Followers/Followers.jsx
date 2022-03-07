import {  useSelector } from "react-redux";

import {
  selectFollowers,
  selectIsFollowersFetching,
} from "../../store/guest/guestSelector";
import FollowUser from "../FollowUser/FollowUser";
import SimpleSpinner from "../Loader/SimpleSpinner";

export default function Followers() {
  const state = useSelector((state) => state);
  const followers = selectFollowers(state);
  const fetching = selectIsFollowersFetching(state);


  return !fetching ? (
    <div className="user-followers">
      {followers.count === 0 && <div className="no-followers">No one follows me  &#128532;</div>}
      {followers.users.map((follower) => (
        <FollowUser user={follower} type='followers' key={follower._id} />
      ))}
    </div>
  ) : (
    <SimpleSpinner />
  );
}
