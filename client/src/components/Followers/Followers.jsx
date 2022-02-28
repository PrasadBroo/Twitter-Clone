import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFollowers } from "../../store/guest/guestActions";
import { selectGuestUser } from "../../store/guest/guestSelector";
import FollowUser from "../FollowUser/FollowUser";

export default function Followers() {
  const state = useSelector(state=>state)
  let guestUser = selectGuestUser(state);
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getFollowers(guestUser._id))
  },[dispatch,guestUser._id])
  return (
    <div className="user-followers">
      <FollowUser />
      <FollowUser />
      <FollowUser />
      <FollowUser />
      <FollowUser />
      <FollowUser />
      <FollowUser />
    </div>
  );
}
