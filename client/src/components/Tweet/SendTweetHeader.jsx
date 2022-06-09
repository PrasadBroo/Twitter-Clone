import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ShinyIcon from "../../icons/ShinyIcon";
import { TOGGLE_NAVBAR } from "../../store/navigation/navigationSlice";
import { selectCurrentUser } from "../../store/user/userSelector";

export default function SendTweetHeader() {
  const dispatch = useDispatch()
  const state = useSelector(state=>state)
  const user = selectCurrentUser(state);
  return (
    <div className="send-tweet-heading-wrap">
      <div className="send-tweet-heading">
        <div className="profile-conatiner">
          <div className="profile-pic" onClick={()=>dispatch(TOGGLE_NAVBAR())}>
            <img src={user.avatar} alt="user" />
          </div>
          <div className="heading-wrap">
            <span className="heading-text">Home</span>
          </div>
        </div>

        <div className="shiny-icon-container">
          <ShinyIcon />
        </div>
      </div>
    </div>
  );
}
