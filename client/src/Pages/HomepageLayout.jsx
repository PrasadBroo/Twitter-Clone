import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import DesktopHeader from "../components/Header/DesktopHeader";
import UnfollowModel from "../models/UnfollowModel/UnfollowModel";
import { selectUnfollowModel } from "../store/model/modelSelector";


export default function Homepage() {
  const state = useSelector((state) => state);
  let model = selectUnfollowModel(state);
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
      {model.isUnfollowModelopen && <UnfollowModel/>}
    </>
  );
}
