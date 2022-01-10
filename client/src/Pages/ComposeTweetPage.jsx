import React from "react";
import RootModel from "../models/RootModel/RootModel";
import SendTweet from "./../components/Tweet/SendTweet";

export default function ComposeTweetPage() {
  return (
    <RootModel bcWhite hideHeader className='send-tweet-model-wrap'>
      <SendTweet />
    </RootModel>
  );
}
