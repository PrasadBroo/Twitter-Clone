import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import News from "../News/News";
import Searchbar from "../Searchbar/Searchbar";
import SendTweet from "./SendTweet";
import WhoToFollow from "./../WhoToFollow/WhoToFollow";
import SendTweetHeader from "./SendTweetHeader";
import { fetchUserFeedTweets } from "../../services/userServices";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/userSelector";
import Tweet from "./Tweet";
import SimpleSpinner from "../Loader/SimpleSpinner";
import useWindowSize from "../../CustomHooks/useWindowSize";
import { useBottomScrollListener } from "react-bottom-scroll-listener";
import cogoToast from "cogo-toast";
import AllCaughtUp from "../AllCaughtUp/AllCaughtUp";
import { defaultOffset } from "../../CONSTANTS";
import { useInfiniteQuery } from "react-query";

export default function TweetSections() {
  const state = useSelector((state) => state);
  const currentUser = selectCurrentUser(state);
  const { width } = useWindowSize();
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: feedTweets,
    fetchNextPage,
    hasNextPage,
    isFetching: fetching,
    isFetchingNextPage,
    error
  } = useInfiniteQuery(
    "feed-tweets",
    ({ pageParam }) => fetchUserFeedTweets(currentUser._id, pageParam),
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.length >= 5) {
          return pages.length * 5;
        }
        return undefined;
      },
    }
  );

  useEffect(() => {
    document.title = `Home / Twitter`;
    window.scrollTo(0,0)
  }, []);

  useBottomScrollListener(
    async () => {
      if (!isFetchingNextPage && hasNextPage) {
        fetchNextPage();
      }
    },
    { offset: defaultOffset }
  );
  return (
    <>
      <div className="tweets-search-news-sections two-flex-col-container">
        <div className="col1 tweet-sections container wrap-input-tweets ">
          <SendTweetHeader />
          <div className="tweet-input-container">
            {width > 500 && <SendTweet />}
          </div>
          {/* all magic happens here */}
          <div className="tweets">
            {feedTweets &&
              feedTweets.length !== 0 &&
              feedTweets.pages.map((page) =>
                page.map((tweet) => <Tweet tweet={tweet} key={tweet._id} />)
              )}
            {!fetching && feedTweets.length === 0 && (
              <WhoToFollow headerText="Suggestion" />
            )}
            {fetching && !feedTweets && <SimpleSpinner topCenter />}

            {isFetchingNextPage && (
              <div className="loading-more-tweets">
                <SimpleSpinner topCenter />
              </div>
            )}
            {!hasNextPage && !fetching && <AllCaughtUp />}
            {error && cogoToast.error(error)}
          </div>
        </div>
        <div className="col2 sidebar searchbar-news-sections ">
          <div className="searchbar-news-sections-wrap">
            <Searchbar
              input={searchQuery}
              setInput={(value) => setSearchQuery(value)}
            />
            <News />
            <WhoToFollow />
          </div>
        </div>
      </div>

      <Outlet />
    </>
  );
}
