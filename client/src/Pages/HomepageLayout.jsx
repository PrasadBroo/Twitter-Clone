import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import DesktopHeader from "../components/Header/DesktopHeader";
import MobileHeader from "../components/Header/MobileHeader";
import useWindowSize from "../CustomHooks/useWindowSize";
import UnfollowModel from "../models/UnfollowModel/UnfollowModel";
import { selectUnfollowModel } from "../store/model/modelSelector";
import { fetchSuggUsers } from "../store/suggestedUsers/suggUsersActions";


export default function Homepage() {
  const state = useSelector((state) => state);
  let model = selectUnfollowModel(state);
  const {width} = useWindowSize();
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(fetchSuggUsers()) 
  },[dispatch])
  return (
    <>
      <div className="homepage">
        {width >= 500 ? <DesktopHeader /> : <MobileHeader/>}
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
