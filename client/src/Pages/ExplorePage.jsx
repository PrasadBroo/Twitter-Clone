import React from "react";
import { Outlet } from "react-router-dom";
import Searchbar from "../components/Searchbar/Searchbar";
import WhoToFollow from "../components/WhoToFollow/WhoToFollow";

export default function ExplorePage() {
  return (
    <>
      <div className="explorepage two-flex-col-container">
        <div className="col1">
            <Searchbar/>
        </div>
        <div className="col2 follow-sugg-news-container" style={{maxWidth:'350px'}}>
            <WhoToFollow/>
        </div>
      </div>
      <Outlet />
    </>
  );
}
