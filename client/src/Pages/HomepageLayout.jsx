import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import DesktopHeader from "../components/Header/DesktopHeader";
import UnfollowModel from "../models/UnfollowModel/UnfollowModel";
import { selectUnfollowModel } from "../store/model/modelSelector";
import { fetchSuggUsers } from "../store/suggestedUsers/suggUsersActions";


export default function Homepage() {
  const state = useSelector((state) => state);
  let model = selectUnfollowModel(state);
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(fetchSuggUsers()) 
  },[dispatch])
  return (
    <>
      <div className="homepage">
        <DesktopHeader />
        <main className="main">
          <div className="main-wrapper">
            <Outlet/>
            
          </div>
        </main>
      </div>
      {model.isUnfollowModelopen && <UnfollowModel/>}
    </>
  );
}
