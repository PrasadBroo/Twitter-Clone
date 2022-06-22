import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectGuestUser } from "../../store/guest/guestSelector";

export default function UserHeader({ customHeader }) {
  const state = useSelector((state) => state);
  const tweetCount = useSelector((state) => state.feed.tweetsCount) || 0;
  let guestUser = selectGuestUser(state);
  const navigate = useNavigate();
  return (
    <div className="user-header-container">
      <div className="user-header">
        <div className="back-btn-container" onClick={() => navigate(-1)}>
          <i className="fas fa-arrow-left left-arrow"></i>
        </div>
        <div className="username-total-tweets-container">
          {!customHeader ? (
            <>
              <div className="username-container">
                <span className="username">{guestUser.fullName}</span>
              </div>
              <div className="total-no-tweets-container">
                <span className="total-no-tweets">{tweetCount} Tweets</span>
              </div>
            </>
          ) : (
            <div className="username-container">
              <span className="total-no-tweets username">{customHeader}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
