import React, { useEffect } from "react";
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
import { fetchTweet } from "../store/feed/feedActions";

export default function Tweetpage() {
  const dispatch = useDispatch();
  const { tweetid } = useParams();
  const tweet = useSelector((state) => state.feed.tweet);
  const fetching = useSelector((state) => state.feed.fetchingTweet);
  const fetchingError = useSelector(state=>state.feed.fetchingTweetError)

  useEffect(() => {
    dispatch(fetchTweet(tweetid));
  }, [tweetid, dispatch]);
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
            <Searchbar />
            <News />
            <WhoToFollow />
          </div>
        </div>
      </div>
    </>
  );
}
