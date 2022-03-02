import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFollowings } from "../../store/guest/guestActions";
import { selectGuestUser } from "../../store/guest/guestSelector";

export default function Following() {
  const state = useSelector((state) => state);
  let guestUser = selectGuestUser(state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFollowings(guestUser._id));
  }, [dispatch, guestUser._id]);
  return (
    <div>
      <h1>Following</h1>
    </div>
  );
}
