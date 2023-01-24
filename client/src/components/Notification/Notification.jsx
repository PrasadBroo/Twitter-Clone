import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import {motion} from 'framer-motion'
export default function Notification({ data }) {
  const handelNotification = () => {
    switch (data.notificationType) {
      case "follow":
        return (
          <>
            <div className="wrap-avatar">
              <img
                src={data.sender.avatar}
                className="user-avatar"
                alt="avatar"
                title={data.sender.fullName}
              />
            </div>
            <div className="noti-wrap">
              <span className="noti-msg">
                <Link
                  to={"/" + data.sender.username}
                  className="user-username default-link"
                >
                  {"@" + data.sender.username}
                </Link>{" "}
                started following you.
              </span>
              <span className="noti-time">{moment(data.createdAt).fromNow()}</span>
            </div>
          </>
        );
        case "like":
          return (
            <>
              <div className="wrap-avatar">
                <img
                  src={data.sender.avatar}
                  className="user-avatar"
                  alt="avatar"
                  title={data.sender.fullName}
                />
              </div>
              <div className="noti-wrap">
                <span className="noti-msg">
                  <Link
                    to={"/" + data.sender.username}
                    className="user-username default-link"
                  >
                    {"@" + data.sender.username}
                  </Link>{" "}
                  liked your <Link
                    to={"/" + data.sender.username+'/status/'+data.data.tweetid}
                    className="user-username default-link"
                  >
                    post 
                  </Link>
                </span>
                <span className="noti-time">{moment(data.createdAt).fromNow()}</span>
              </div>
            </>
          )
          case "retweet":
            return (
              <>
                <div className="wrap-avatar">
                  <img
                    src={data.sender.avatar}
                    className="user-avatar"
                    alt="avatar"
                    title={data.sender.fullName}
                  />
                </div>
                <div className="noti-wrap">
                  <span className="noti-msg">
                    <Link
                      to={"/" + data.sender.username}
                      className="user-username default-link"
                    >
                      {"@" + data.sender.username}
                    </Link>{" "}
                    retweeted your <Link
                      to={"/" + data.sender.username+'/status/'+data.data.tweetid}
                      className="user-username default-link"
                    >
                      post
                    </Link>
                  </span>
                  <span className="noti-time">{moment(data.createdAt).fromNow()}</span>
                </div>
              </>
            )
      case "comment":
        return (
          <>
            <div className="wrap-avatar">
              <img
                src={data.sender.avatar}
                className="user-avatar"
                alt="avatar"
                title={data.sender.fullName}
              />
            </div>
            <div className="noti-wrap">
              <span className="noti-msg">
                <Link
                  to={"/" + data.sender.username}
                  className="user-username default-link"
                >
                  {"@" + data.sender.username}
                </Link>{" "}
                dropped comment on your <Link
                  to={"/" + data.sender.username+'/status/'+data.data.tweetid}
                  className="user-username default-link"
                >
                  post 
                </Link>
              </span>
              <span className="noti-time">{moment(data.createdAt).fromNow()}</span>
            </div>
          </>
        )
      default:
        return null;
    }
  };
  return <motion.div 
   className="notification"
   initial={{opacity:0,y:-20}}
   animate={{opacity:1,y:0}}
   >{handelNotification()}</motion.div>;
}
