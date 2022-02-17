import React from "react";
import { useNavigate } from "react-router-dom";
import TextButton from "../Button/TextButton/TextButton";
import Input from "../Input/Input";
import Textarea from "../Input/Textarea";
import RootModel from "./../../models/RootModel/RootModel";

export default function EditProfile() {
  const navigate = useNavigate();
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
          <TextButton cBlue rounded>
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
        <Input placeholder="Name" className="user-input" />
        <Textarea placeholder="Bio" className="user-input" rows={3} />
        <Input placeholder="Location" className="user-input" />
        <Input placeholder="Website" className="user-input" />
      </div>
    </RootModel>
  );
}
