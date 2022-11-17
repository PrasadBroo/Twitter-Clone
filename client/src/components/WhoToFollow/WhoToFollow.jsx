import React from "react";
import { useQuery } from "react-query";
import { fetchSuggstedUsers } from "../../services/userServices";
import FollowUser from "../FollowUser/FollowUser";
import SimpleSpinner from "../Loader/SimpleSpinner";

export default function WhoToFollow({headerText}) {
  const {data:users,isLoading:fetching,error} = useQuery('suggested-users',fetchSuggstedUsers)
  return (
    <div className="who-to-follow-suggestions">
      {!fetching ? (
        <>
          <div className="who-to-follow-heading-container">
            <h2>{headerText || 'Who to follow'}</h2>
          </div>
          {users &&
            users.map((user) => <FollowUser user={user} key={user._id} type='suggUsers'/>)}
          {!users && <h5>No users suggestions</h5>}
          {error && <h3 className="error-text">{error.message}</h3>}
        </>
      ) : (
        <SimpleSpinner topCenter />
      )}
    </div>
  );
}
