import React, { useState, useEffect } from "react";
import { searchUsers } from "../../services/userServices";
import FollowUser from "../FollowUser/FollowUser";
import SimpleSpinner from "../Loader/SimpleSpinner";
import useComponentVisible from "./../../CustomHooks/useComponentVisible";

export default function Searchbar({className}) {
  const [searchText, setSearchText] = useState('');
  const [users, setUsers] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [isError, setIsError] = useState(null);
  const {
    ref: searchbarRef,
    isVisible: isResultVisible,
    setIsVisible: setResultVisible,
  } = useComponentVisible(false);
  useEffect(() => {
    try {
      setFetching(true);
      setResultVisible(true)
      async function fetchUsers() {
        const users = await searchUsers(searchText);
        setUsers(users);
        setFetching(false);
      }
      setTimeout(() => {
        if (searchText) fetchUsers();
      }, 1000);
    } catch (error) {
      setIsError(error.message);
      setFetching(false);
    }
  }, [searchText,setResultVisible]);

  return (
    <div className={"searchbar "+className} ref={searchbarRef}>
      <label htmlFor="search-input" className="search-input-label" >
        <div className="search-icon-container">
          <i className="far fa-search"></i>
        </div>
        <div className="wrap-search-input">
          <input
            type="text"
            name="search-text"
            className="search-input"
            id="search-input"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search Twitter Clone"
          />
          {searchText && isResultVisible && (
            <div className="users-list">
              <span className="close-btn" onClick={() => setSearchText('')}>
                <i className="fas fa-xmark"></i>
              </span>
              {!fetching &&
                users &&
                users.map((user) => <FollowUser user={user} key={user._id} />)}
              {fetching && <SimpleSpinner topCenter />}
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
