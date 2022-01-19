import React from "react";
import { Outlet } from "react-router-dom";
import DesktopHeader from "../components/Header/DesktopHeader";


export default function Homepage() {
  return (
    <>
      <div className="homepage">
        <DesktopHeader />
        <main className="main">
          <div className="main-wrapper">
            <Outlet/>
            
            {/* <div className="container with-searchbar-suggetions">
              <div className="searchbar"></div>
              <div className="follow-suggetions"></div>
            </div> */}
          </div>
        </main>
      </div>
    </>
  );
}
