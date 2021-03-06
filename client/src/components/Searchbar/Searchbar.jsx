import React, { useState, useEffect } from "react";
import { searchUsers } from "../../services/userServices";
import CustomSearch from "../../subcomponents/CustomSearch";
import FollowUser from "../FollowUser/FollowUser";
import SimpleSpinner from "../Loader/SimpleSpinner";
import useComponentVisible from "./../../CustomHooks/useComponentVisible";
import { useDebounce } from "use-debounce";
import { useBottomScrollListener } from "react-bottom-scroll-listener";

function Searchbar({ className, input, setInput }) {
  const [users, setUsers] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [isError, setIsError] = useState(null);
  const [value] = useDebounce(input, 1000);
  const [hasMore, setHasMore] = useState(true);
  const {
    ref: searchbarRef,
    isVisible: isResultVisible,
    setIsVisible: setResultVisible,
  } = useComponentVisible(false);
  useEffect(() => {
    try {
      async function fetchUsers() {
        setFetching(true);
        setResultVisible(true);
        const users = await searchUsers(value);
        if (users.length < 10) setHasMore(false);
        setUsers(users);
        setFetching(false);
      }

      setTimeout(() => {
        if (value) fetchUsers();
      }, 1000);
    } catch (error) {
      setIsError(error.message);
      setFetching(false);
    }
  }, [value, setResultVisible]);

  const scrollRef = useBottomScrollListener(async () => {
    if (!fetching && hasMore && value) {
      setFetching(true);
      const next_users = await searchUsers(value, users.length);
      if (next_users.length < 10) setHasMore(false);
      setUsers((prevState) => prevState.concat(next_users));
      setFetching(false);
    }
  });
  return (
    <div className={"searchbar " + className}>
      <label htmlFor="search-input" className="search-input-label">
        <div className="search-icon-container">
          <i className="far fa-search"></i>
        </div>
        <div className="wrap-search-input">
          <input
            ref={searchbarRef}
            type="text"
            name="search-text"
            className="search-input"
            id="search-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search Twitter Clone"
          />
          {input && isResultVisible && (
            <div className="users-list" ref={scrollRef}>
              <span className="close-btn" onClick={() => setInput("")}>
                <i className="fas fa-xmark"></i>
              </span>
              {!fetching && (
                <>
                  <CustomSearch q={input} />
                </>
              )}

              {users &&
                users.map((user) => <FollowUser user={user} key={user._id} />)}
              {fetching && users.length === 0 && <SimpleSpinner topCenter />}
              {!isError && users.length === 0 && !fetching && (
                <span className="no-users-found">No users found &#128528;</span>
              )}
            </div>
          )}
        </div>
      </label>
    </div>
  );
}

export default React.memo(Searchbar);
