import React, { useState } from "react";
import MediaIcon from "../../icons/MediaIcon";
import profilePic from "../../static/images/profile.jpg";
import TextButton from "../Button/TextButton/TextButton";
import GifIcon from "./../../icons/GifIcon";
import PollIcon from "./../../icons/PollIcon";
import EmojiIcon from "./../../icons/EmojiIcon";
import ScheduleIcon from "./../../icons/ScheduleIcon";
import LocationIcon from "./../../icons/LocationIcon";
import classNames from "classnames";

export default function SendTweet({ className }) {
  const [tweetPic, setTweetPic] = useState(null);
  const sendTweetClassnames = classNames("send-tweet", className);
  function auto_grow(element) {
    element.target.style.height = "48px";
    element.target.style.height = element.target.scrollHeight + "px";
  }
  const handelTweetPicChange = (e) => {
    try {
      const [file] = e.target.files;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setTweetPic(reader.result);
      };
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <section className={sendTweetClassnames}>
      <div className="send-tweet-wrap">
        <div className="wrapper">
          <div className="profile-pic-container">
            <img src={profilePic} alt="userpic" className="user-pic" />
          </div>
          <div className="whats-happening">
            <div className="tweet-input-container">
              <textarea
                onInput={(e) => auto_grow(e)}
                type="text"
                name="tweet-text"
                placeholder="What's happening?"
                className="tweet-input"
                maxLength={300}
              />
            </div>
            <div className="tweet-pic">
              {tweetPic && (
                <span className="close-btn" onClick={()=>setTweetPic(null)}>
                  <i className="fas fa-xmark"></i>
                </span>
              )}
              <input
                type="file"
                accept="image/*"
                alt="tweet pic"
                id="tweetPic"
                name="tweetPic"
                hidden
                multiple={false}
                onChange={handelTweetPicChange}
              ></input>
              {tweetPic && (
                <img
                  src={tweetPic}
                  alt="tweet-attachment"
                  className="tweet-attachment-pic"
                />
              )}
            </div>
            <div className="tweet-attachment">
              <div className="icon-containers">
                <div
                  className={
                    tweetPic ? "icon-container icon-disabled" : "icon-container"
                  }
                  onClick={() => document.getElementById("tweetPic").click()}
                >
                  <MediaIcon color={tweetPic ? "red" : null} />
                </div>
                <div className="icon-container icon-disabled">
                  <GifIcon />
                </div>
                <div className="icon-container icon-disabled">
                  <PollIcon />
                </div>
                <div className="icon-container icon-disabled">
                  <EmojiIcon />
                </div>
                <div className="icon-container icon-disabled">
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
