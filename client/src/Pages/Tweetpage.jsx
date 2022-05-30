import cogoToast from "cogo-toast";
import React, { useEffect, useRef, useState } from "react";
import { useBottomScrollListener } from "react-bottom-scroll-listener";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import SimpleSpinner from "../components/Loader/SimpleSpinner";
import News from "../components/News/News";
import NotFound from "../components/NotFound/NotFound";
import Searchbar from "../components/Searchbar/Searchbar";
import SendTweet from "../components/Tweet/SendTweet";
import Tweet from "../components/Tweet/Tweet";
import UserHeader from "../components/User/UserHeader";
import WhoToFollow from "../components/WhoToFollow/WhoToFollow";
import { defaultOffset } from "../CONSTANTS";
import { fetchReplies } from "../services/tweetService";
import { fetchTweet } from "../store/feed/feedActions";
import { FETCHING_TWEET_REPLIES_SUCCESS } from "../store/feed/feedSlice";

export default function Tweetpage() {
  const dispatch = useDispatch();
  const { tweetid } = useParams();
  const tweet = useSelector((state) => state.feed.tweet);
  const fetching = useSelector((state) => state.feed.fetchingTweet);
  const fetchingError = useSelector(state=>state.feed.fetchingTweetError)
  const fetchingMoreTweets = useRef(false);
  const hasMore = useSelector((state) => state.feed.hasMoreTweetReplies);
  const [searchQuery,setSearchQuery] = useState('')
  useEffect(() => {
    dispatch(fetchTweet(tweetid));
  }, [tweetid, dispatch]);


  useBottomScrollListener(async () => {
    if (!fetchingMoreTweets.current && !fetching && hasMore) {
      try {
        fetchingMoreTweets.current = (true);
        const replies = await fetchReplies(tweet.replies.length,tweet._id);
        dispatch(FETCHING_TWEET_REPLIES_SUCCESS(replies));
        fetchingMoreTweets.current = (false);
      } catch (error) {
        fetchingMoreTweets.current = (false);
        cogoToast.error(error.message);
      }
    }
  },{offset:defaultOffset});
  return (
    <>
      <div className="tweetpage two-flex-col-container">
        <div className="col1 fpc-1">
          <UserHeader customHeader='Tweet'/>

          {!fetchingError && <div className="user-tweet-content">
            {fetching ? (
              <SimpleSpinner topCenter />
            ) : (
              <>
                {tweet.in_reply_to_status_id && (
                  <div className="retweet-wrap">
                    <Tweet
                      tweet={tweet.hasParentTweet}
                      isParentTweet
                      className="tweetpage-main-tweet"
                      from="parentTweet"
                      key={tweet.hasParentTweet._id}
                    />
                  </div>
                )}

                <Tweet tweet={tweet} className="tweetpage-main-tweet" key={tweet._id} from='replyTweet' newlook/>
                <div className="replying-to">
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
                <SendTweet
                  type="tweetReply"
                  placeholder="Tweet your reply"
                  tweet={tweet}
                  className="tweetpage-send-tweet"
                />
                <div className="tweet-replies">
                  {tweet.replies.map((tweet) => (
                    <Tweet
                      tweet={tweet}
                      from="tweet-page-replies"
                      className="tweet-page-replies"
                      key={tweet._id}
                      
                    />
                  ))}
                </div>
              </>
            )}
          </div>}
          {fetchingError && <NotFound/>}
        </div>
        <div className="col2 tweet-sugg-news-container">
          <div className="tweet-sugg-news-wrap">
            <Searchbar input={searchQuery} setInput={(value)=>setSearchQuery(value)}/>
            <News />
            <WhoToFollow />
          </div>
        </div>
      </div>
    </>
  );
}
