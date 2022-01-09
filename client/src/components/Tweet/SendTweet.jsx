import React from "react";
import MediaIcon from "../../icons/MediaIcon";
import ShinyIcon from "../../icons/ShinyIcon";
import profilePic from "../../static/images/profile.jpg";
import TextButton from "../Button/TextButton/TextButton";

export default function SendTweet() {
  return (
    <section className="send-tweet">
      <div className="send-tweet-wrap">
        <div className="send-tweet-heading">
          <div className="heading-wrap">
            <span className="heading-text">Home</span>
          </div>
          <div className="shiny-icon-container">
            <ShinyIcon />
          </div>
        </div>
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
                  <MediaIcon />
                </div>
                <div className="icon-container">
                  <MediaIcon />
                </div>
                <div className="icon-container">
                  <MediaIcon />
                </div>
              </div>
              <div className="send-tweet-btn-container">
                <TextButton bcBlue rounded className='send-tweet-btn' disabled>Tweet</TextButton>
              </div>
            </div>
          </div>
        </div>

        <div className="tweet-attachment"></div>
      </div>
    </section>
  );
}
