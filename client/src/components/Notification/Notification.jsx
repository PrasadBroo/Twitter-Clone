import React from "react";
import { Link } from "react-router-dom";

export default function Notification({ data }) {
  const handelNotification = () => {
    switch (data.notificationType) {
      case "mention":
        return (
          <>
          <div className="wrap-avatar">
            <img src={data.sender.avatar} className='user-avatar' alt="avatar" title={data.sender.fullName}/>
            <Link to={"/" + data.sender.username} className='user-username'>{data.sender.username}</Link>
          </div>
            <span className="noti-msg">mentioned you in tweet</span>
            <Link to={"/" + data.sender.username + "/status/" + data.tweetid}>
              see
            </Link>
          </>
        );
      default:
        return null;
    }
  };
  return <div className="notification">{handelNotification()}</div>;
}
