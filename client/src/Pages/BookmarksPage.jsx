import React, { useEffect, useState } from "react";
import { useBottomScrollListener } from "react-bottom-scroll-listener";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import SimpleSpinner from "../components/Loader/SimpleSpinner";
import News from "../components/News/News";
import Searchbar from "../components/Searchbar/Searchbar";
import Tweet from "../components/Tweet/Tweet";
import WhoToFollow from "../components/WhoToFollow/WhoToFollow";
import ThreeDotsIcon from "../icons/ThreeDotsIcon";
import { fetchUserBookmarks } from "../store/bookmarks/bookmarksActions";
import { CLEAR_BOOKMARKS } from "../store/bookmarks/bookmarksSlice";
import { selectUserBookmarks } from "./../store/bookmarks/bookmarksSelector";

export default function BookmarksPage() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const bookmarks = selectUserBookmarks(state);
  const fetching = useSelector((state) => state.bookmarks.fetching);
  const hasMore = useSelector((state) => state.bookmarks.hasMore);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    dispatch(fetchUserBookmarks());
    return () => dispatch(CLEAR_BOOKMARKS());
  }, [dispatch]);

  useBottomScrollListener(async () => {
    if (!fetching && hasMore) {
      dispatch(fetchUserBookmarks(bookmarks.length));
    }
  });

  return (
    <>
      <div className="bookmarkspage two-flex-col-container">
        <div className="col1 bkc-1">
          <div className="bookamark-header">
            <div className="wrap">
              <span className="bookmarks-text">Bookmarks</span>
              <span className="username-text">@prasadbro</span>
            </div>

            <div className="bookmarks-options">
              <ThreeDotsIcon />
            </div>
          </div>
          {fetching && bookmarks.length === 0 && (
            <SimpleSpinner topCenter className="bookmark-loader" />
          )}
          {bookmarks.length !== 0 && <Bookmarks bookmarks={bookmarks} />}
          {bookmarks.length === 0 && !fetching && <NoBookmarks />}
        </div>
        <div className="col2 follow-sugg-news-container">
          <div className="follow-sugg-news-wrap">
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

const NoBookmarks = () => {
  return (
    <div className="no-bookmarked-tweets">
      <span className="no-tweets-text">
        You haven’t added any Tweets to your Bookmarks yet
      </span>
      <span className="no-tweets-text-two">
        When you do, they’ll show up here.
      </span>
    </div>
  );
};

const Bookmarks = ({ bookmarks }) => {
  return (
    <div className="bookmarks">
      {bookmarks &&
        bookmarks.map((bk) => (
          <Tweet tweet={bk} key={bk._id} className="tweet-bookmark" />
        ))}
    </div>
  );
};
