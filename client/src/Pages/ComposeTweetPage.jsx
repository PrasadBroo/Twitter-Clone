import React from "react";
import RootModel from "../models/RootModel/RootModel";
import SendTweet from "./../components/Tweet/SendTweet";
import Retweet from "./../components/Retweet/Retweet";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectComposeTweetModel } from "../store/model/modelSelector";

export default function ComposeTweetPage() {
  const state = useSelector((state) => state);
  const model = selectComposeTweetModel(state);
  const navigate = useNavigate();
  return (
    <RootModel bcWhite hideHeader className="send-tweet-model-wrap">
      <div className="tweet-header">
        <i className="fas fa-times close-btn" onClick={() => navigate(-1)}></i>
      </div>
      {model.type ==='tweetReply'&& <Retweet tweet={model.tweet}/>}
      <SendTweet placeholder='Tweet your reply' type={model.type} tweet={model.tweet} className="model-tweet"/>
    </RootModel>
  );
}
