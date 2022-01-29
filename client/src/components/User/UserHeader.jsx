import React from "react";
import { useNavigate } from "react-router-dom";

export default function UserHeader() {
  const navigate = useNavigate();
  return (
    <div className="user-header-container">
      <div className="user-header">
        <div className="back-btn-container" onClick={() => navigate(-1)}>
          <i className="fas fa-arrow-left left-arrow"></i>
        </div>
        <div className="username-total-tweets-container">
          <div className="username-container">
            <span className="username">Prasadbroo</span>
          </div>
          <div className="total-no-tweets-container">
            <span className="total-no-tweets">0 Tweets</span>
          </div>
        </div>
      </div>
    </div>
  );
}
