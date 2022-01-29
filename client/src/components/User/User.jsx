import React from "react";
import { useParams } from "react-router-dom";
import News from "../News/News";
import Searchbar from "../Searchbar/Searchbar";
import WhoToFollow from "../WhoToFollow/WhoToFollow";
import UserHeader from "./UserHeader";
import TextButton from './../Button/TextButton/TextButton';

export default function User() {
  const { username } = useParams();
  return (
    <div className="two-flex-col-container userpage">
      <div className="col1 user-section">
        <UserHeader/>
        <div className="bc-image-container">
            <img src="https://via.placeholder.com/700" alt="bc-pic" className="bc-image"/>
        </div>
        <div className="user-details">
            <div className="profile-pic-container">
                <img src="https://via.placeholder.com/130/blue" alt="profile-pic" className="profile-pic"/>
            </div>
            <div className="profile-options">
                <TextButton  rounded className='edit-profile-btn'>Edit profile</TextButton>
            </div>
            <div className="user-other-details">
                
            </div>
        </div>
      </div>
      <div className="col2 follow-news-suggetions">
        <Searchbar />
        <WhoToFollow />
        <News />
      </div>
    </div>
  );
}
