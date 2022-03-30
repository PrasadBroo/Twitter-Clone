import { Link } from "react-router-dom";
import moment from "moment";

export default function Retweet({ tweet,showPic }) {
  return (
    <div className="retweets tweet-link">
      <div className="tweet tweet-container">
        <div className="profile-pic-container">
          <img src={tweet.user.avatar} alt="user-pic" className="profile-pic" />
          <span className="hr-line"></span>
        </div>
        <div className="tweet-content">
          <div className="tweet-content-header">
            <span className="tweet-content-child user-full-name">
              {tweet.user.fullName}
            </span>
            <span className="tweet-content-child user-username">
              @{tweet.user.username}
            </span>
            <span className="tweet-content-child useless-dot"></span>
            <span className="tweet-content-child timestamp">
              {moment(tweet.createdAt).fromNow()}
            </span>
          </div>
          <div className="tweet-content-text">
            <p className="tweet-text">{tweet.caption}</p>
          </div>
          {showPic && <div className="tweet-content-image-container">
            {tweet.pic && (
              <img
                src={tweet.pic}
                alt="tweet-pic"
                className="tweet-content-image"
              />
            )}
          </div>}
          <div className="reaplying-to">
            <span>
              Replaying to{" "}
              <Link
                to={"/" + tweet.user.username}
                className="default-link reaplyin-to-link"
              >
                @{tweet.user.username}
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
