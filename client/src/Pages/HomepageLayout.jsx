import { AnimatePresence } from "framer-motion";
import React from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import TweetButton from "../components/Button/TweetButton/TweetButton";
import DesktopHeader from "../components/Header/DesktopHeader";
import MobileHeader from "../components/Header/MobileHeader";
import useWindowSize from "../CustomHooks/useWindowSize";
import UnfollowModel from "../models/UnfollowModel/UnfollowModel";
import { selectUnfollowModel } from "../store/model/modelSelector";

export default function Homepage() {
  const state = useSelector((state) => state);
  let model = selectUnfollowModel(state);
  const { width } = useWindowSize();
  const navigate = useNavigate();

  return (
    <>
      {width < 500 && (
        <TweetButton onClick={() => navigate("/compose/tweet")} />
      )}
      <div className="homepage">
        {width >= 500 ? <DesktopHeader /> : <MobileHeader />}
        <main className="main">
          <div className="main-wrapper">
            <Outlet />
          </div>
        </main>
      </div>

      <AnimatePresence>
        {model.isUnfollowModelopen && <UnfollowModel />}
      </AnimatePresence>
    </>
  );
}
