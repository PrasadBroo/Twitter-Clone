import React from "react";
import DesktopHeader from "../components/Header/DesktopHeader";

export default function Homepage() {
  return (
    <div className="homepage">
      <DesktopHeader />
      <main className="main">
        <div className="main-wrapper">
          <div className="container wrap-input-tweets">
            <div className="tweet-input-container"></div>
            <div className="tweets"></div>
          </div>
          <div className="container with-searchbar-suggetions">
            <div className="searchbar"></div>
            <div className="follow-suggetions"></div>
          </div>
        </div>
      </main>
    </div>
  );
}
