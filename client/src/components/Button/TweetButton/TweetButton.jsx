import React from "react";
import TweetIcon from "../../../icons/TweetIcon";
import IconButton from "./../IconButton/IconButton";

export default function TweetButton({onClick}) {
  return <IconButton icon={<TweetIcon />} className="tweet-round-btn" onClick={onClick}/>;
}
