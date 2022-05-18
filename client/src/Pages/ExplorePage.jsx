import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import Searchbar from "../components/Searchbar/Searchbar";
import WhoToFollow from "../components/WhoToFollow/WhoToFollow";

export default function ExplorePage() {
  return (
    <>
      <div className="explorepage two-flex-col-container">
        <div className="col1 explorepage-col1">
          <div className="top-header">
            <Searchbar className="explorepage-searchbar" />
            <div className="icon-conatiner">
              <i className="far fa-gear"></i>
            </div>
          </div>
          <div className="nav-links-wrapper">
            <div className="nav-links">
            <NavLink
              to="for-you"
              className={({ isActive }) =>
                "header-link" + (isActive ? " active-header-link" : "")
              }
            >For you</NavLink>
            <NavLink
              to="/home"
              className={({ isActive }) =>
                "header-link" + (isActive ? " active-header-link" : "")
              }
            >COVID-19</NavLink>
            <NavLink
              to="/home"
              className={({ isActive }) =>
                "header-link" + (isActive ? " active-header-link" : "")
              }
            >Trending</NavLink>
            <NavLink
              to="/home"
              className={({ isActive }) =>
                "header-link" + (isActive ? " active-header-link" : "")
              }
            >News</NavLink>
            <NavLink
              to="/home"
              className={({ isActive }) =>
                "header-link" + (isActive ? " active-header-link" : "")
              }
            >Sports</NavLink>
            <NavLink
              to="/home"
              className={({ isActive }) =>
                "header-link" + (isActive ? " active-header-link" : "")
              }
            >Entertainment</NavLink>
          </div>
          </div>
          <div className="explore-content">
            <Outlet/>
          </div>
          
        </div>
        <div
          className="col2 follow-sugg-news-container">
          <WhoToFollow />
        </div>
      </div>
    </>
  );
}
