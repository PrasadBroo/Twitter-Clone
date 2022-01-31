import React from "react";
import MediaIcon from "../../icons/MediaIcon";
import ShinyIcon from "../../icons/ShinyIcon";
import profilePic from "../../static/images/profile.jpg";
import TextButton from "../Button/TextButton/TextButton";
import GifIcon from "./../../icons/GifIcon";
import PollIcon from "./../../icons/PollIcon";
import EmojiIcon from "./../../icons/EmojiIcon";
import ScheduleIcon from "./../../icons/ScheduleIcon";
import LocationIcon from "./../../icons/LocationIcon";
import classNames from "classnames";

export default function SendTweet({ className }) {
  const sendTweetClassnames = classNames("send-tweet", className);
  return (
    <section className={sendTweetClassnames}>
      <div className="send-tweet-wrap">
        

        <div className="wrapper">
          <div className="profile-pic-container">
            <img src={profilePic} alt="userpic" className="user-pic" />
          </div>
          <div className="whats-happening">
            <div className="tweet-input-container">
              <input
                type="text"
                name="tweet-text"
                placeholder="What's happening?"
                className="tweet-input"
              />
            </div>
            <div className="tweet-attachment">
              <div className="icon-containers">
                <div className="icon-container">
                  <MediaIcon />
                </div>
                <div className="icon-container">
                  <GifIcon />
                </div>
                <div className="icon-container">
                  <PollIcon />
                </div>
                <div className="icon-container">
                  <EmojiIcon />
                </div>
                <div className="icon-container">
                  <ScheduleIcon />
                </div>
                <div className="icon-container icon-disabled">
                  <LocationIcon />
                </div>
              </div>
              <div className="send-tweet-btn-container">
                <TextButton bcBlue rounded className="send-tweet-btn" disabled>
                  Tweet
                </TextButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
