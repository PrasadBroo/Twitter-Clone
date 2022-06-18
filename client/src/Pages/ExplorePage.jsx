import React, { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import Searchbar from "../components/Searchbar/Searchbar";
import WhoToFollow from "../components/WhoToFollow/WhoToFollow";

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const {pathname} = useLocation();
  return (
    <>
        <div className="explorepage two-flex-col-container">
          <div className="col1 explorepage-col1">
            <div className="top-header">
              <Searchbar
                className="explorepage-searchbar"
                input={searchQuery}
                setInput={(e) => setSearchQuery(e)}
              />
              <div className="icon-conatiner">
                <i className="far fa-gear"></i>
              </div>
            </div>
            <div className="nav-links-wrapper">
              <div className="nav-links">
                <NavLink
                  to="for-you"
                  className={({ isActive }) =>
                    "header-link " + (isActive ? " active-header-link " : "") +
                    (pathname === "/explore" ? "active-header-link" : null)
                  }
                >
                  For you
                  <span className="custom-border-bottom"></span>
                </NavLink>

                <NavLink
                  to="covid20"
                  className={({ isActive }) =>
                    "header-link" + (isActive ? " active-header-link" : "")
                  }
                >
                  COVID-19
                  <span className="custom-border-bottom"></span>
                </NavLink>
                <NavLink
                  to="trending"
                  className={({ isActive }) =>
                    "header-link" + (isActive ? " active-header-link" : "")
                  }
                >
                  Trending
                  <span className="custom-border-bottom"></span>
                </NavLink>
                <NavLink
                  to="news"
                  className={({ isActive }) =>
                    "header-link" + (isActive ? " active-header-link" : "")
                  }
                >
                  News
                  <span className="custom-border-bottom"></span>
                </NavLink>
                <NavLink
                  to="sports"
                  className={({ isActive }) =>
                    "header-link" + (isActive ? " active-header-link" : "")
                  }
                >
                  Sports
                  <span className="custom-border-bottom"></span>
                </NavLink>
                <NavLink
                  to="entertainment"
                  className={({ isActive }) =>
                    "header-link" + (isActive ? " active-header-link" : "")
                  }
                >
                  Entertainment
                  <span className="custom-border-bottom"></span>
                </NavLink>
              </div>
            </div>
            <div className="explore-content">
              <Outlet />
            </div>
          </div>
          <div className="col2 follow-sugg-news-container">
            <WhoToFollow />
          </div>
        </div>
    </>
  );
}
