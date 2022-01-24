import React from "react";
import RootModel from "../models/RootModel/RootModel";
import SendTweet from "./../components/Tweet/SendTweet";
import Retweet from './../components/Retweet/Retweet';

export default function ComposeTweetPage({isRetweet}) {
  return (
    <RootModel bcWhite hideHeader className='send-tweet-model-wrap'>
      {!isRetweet && <Retweet/>}
      <SendTweet />
    </RootModel>
  );
}
