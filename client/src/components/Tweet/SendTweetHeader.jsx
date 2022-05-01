import React from "react";
import { useSelector } from "react-redux";
import ShinyIcon from "../../icons/ShinyIcon";
import { selectCurrentUser } from "../../store/user/userSelector";

export default function SendTweetHeader() {
  const state = useSelector(state=>state)
  const user = selectCurrentUser(state);
  return (
    <div className="send-tweet-heading-wrap">
      <div className="send-tweet-heading">
        <div className="profile-conatiner">
          <div className="profile-pic">
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
