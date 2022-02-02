import React from "react";
import { Link } from "react-router-dom";
import TextButton from "../Button/TextButton/TextButton";

export default function FollowUser() {
  return (
    <div className="follow-user">
      <div className="profile-pic-container">
        <img
          src="https://via.placeholder.com/50"
          alt="profile-pic"
          className="profile-pic"
        />
      </div>
      <div className="profile-details">
        <Link to="/profile" className="user-fullname">
          Prasad Shinde
        </Link>
        <span className="user-username">@Prasadbro</span>
      </div>
      <div className="follow-btn-container">
        <TextButton className="follow-btn">Follow</TextButton>
      </div>
    </div>
  );
}
