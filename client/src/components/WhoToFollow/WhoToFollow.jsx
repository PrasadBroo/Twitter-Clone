import React from "react";
import { useSelector } from "react-redux";
import { selectSuggestedUsers } from "../../store/suggestedUsers/suggUsersSelector";
import FollowUser from "../FollowUser/FollowUser";
import SimpleSpinner from "../Loader/SimpleSpinner";

export default function WhoToFollow() {
  const state = useSelector((state) => state);
  const users = selectSuggestedUsers(state);
  const fetching = useSelector((state) => state.suggestedUsers.fetching);
  return (
    <div className="who-to-follow-suggestions">
      {!fetching ? (
        <>
          <div className="who-to-follow-heading-container">
            <h2>Who to follow</h2>
          </div>
          {users &&
            users.map((user) => <FollowUser user={user} key={user._id} type='suggUsers'/>)}
          {!users && <h5>No users suggestions</h5>}
        </>
      ) : (
        <SimpleSpinner topCenter />
      )}
    </div>
  );
}
