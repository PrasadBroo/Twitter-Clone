import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextButton from "../Button/TextButton/TextButton";
import Input from "../Input/Input";
import Textarea from "../Input/Textarea";
import RootModel from "./../../models/RootModel/RootModel";

export default function EditProfile() {
  const [fullName,setFullName] = useState('');
  const [website,setWebsite] = useState('');
  const [bio,setBio] = useState('');
  const [location,setLocation] = useState('');
  const navigate = useNavigate();
  console.log(bio)
  return (
    <RootModel hideHeader className="edit-profile-model">
      <div className="edit-profile-header">
        <div className="model-close-btn" onClick={() => navigate("/any")}>
          <i className="far fa-times"></i>
        </div>
        <div className="edit-profile-text-container">
          <span className="edit-profile-text">Edit profile</span>
        </div>
        <div className="edit-profile-btn-container">
          <TextButton cBlue rounded disabled={!fullName || !website || !bio || !location}>
            Save
          </TextButton>
        </div>
      </div>
      <div className="pic-bc-container">
        <div className="bc-pic">
          <span className="edit-icon">
            <i className="far fa-camera"></i>
          </span>
          <img src="https://via.placeholder.com/700/red" alt="bc" />
        </div>
        <div className="profile-pic">
          <span className="edit-icon">
            <i className="far fa-camera"></i>
          </span>
          <img src="https://via.placeholder.com/100/FF0000/FFFFFF" alt="user-profile-pic" />
        </div>
      </div>
      <div className="user-details-inputs">
        <Input placeholder="Name" className="user-input" onChange={(e)=> setFullName(e)} focused={fullName}/>
        <Textarea placeholder="Bio" className="user-input" rows={3} onChange={(e)=> setBio(e.target.value)} focused={bio}/>
        <Input placeholder="Location" className="user-input" onChange={(e)=> setLocation(e)} focused={location}/>
        <Input placeholder="Website" className="user-input" onChange={(e)=> setWebsite(e)} focused={website}/>
      </div>
    </RootModel>
  );
}
