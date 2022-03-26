import React from "react";
import { useSelector } from "react-redux";
import { Link, Outlet, useParams } from "react-router-dom";
import News from "../components/News/News";
import Searchbar from "../components/Searchbar/Searchbar";
import SendTweet from "../components/Tweet/SendTweet";
import Tweet from "../components/Tweet/Tweet";
import UserHeader from "../components/User/UserHeader";
import WhoToFollow from "../components/WhoToFollow/WhoToFollow";

export default function Tweetpage() {
  const { tweetid } = useParams();
  console.log(tweetid);
  const tweets = useSelector((state) => state.feed.tweets);
  return (
    <>
      <div className="tweetpage two-flex-col-container">
        <div className="col1 fpc-1">
          <div className="tweetpage-header">
            <UserHeader />
          </div>
          <div className="user-tweet-content">
            <Tweet tweet={tweets[6]} />
            <div className="replying-to">
              <span>
                Replaying to{" "}
                <Link
                  to={"/" + tweets[0].user.username}
                  className="default-link reaplyin-to-link"
                >
                  @{tweets[0].user.username}
                </Link>
              </span>
            </div>
            <SendTweet type='tweetReply' placeholder='Tweet your reply'/>
          </div>
        </div>
        <div className="col2 tweet-sugg-news-container">
          <div className="tweet-sugg-news-wrap">
            <Searchbar />
            <News />
            <WhoToFollow />
          </div>
        </div>
      </div>
    </>
  );
}
