import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../../store/user/userActions";
import { selectCurrentUser, selectUpdatingProfile } from "../../store/user/userSelector";
import TextButton from "../Button/TextButton/TextButton";
import Input from "../Input/Input";
import Textarea from "../Input/Textarea";
import SimpleSpinner from "../Loader/SimpleSpinner";
import RootModel from "./../../models/RootModel/RootModel";


export default function EditProfile() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  let user = selectCurrentUser(state);
  const updatingProfile = selectUpdatingProfile(state)
  const [fullName, setFullName] = useState(user.fullName ?? "");
  const [website, setWebsite] = useState(user.website ?? "");
  const [bio, setBio] = useState(user.bio ?? "");
  const [location, setLocation] = useState(user.location ?? "");
  const [bcPic, setBcPic] = useState(user.backgroundImage);
  const [profilePic, setProfilePic] = useState(user.avatar);
  const navigate = useNavigate();
  const handelProfilePicChange = (e) => {
    try {
      const [file] = e.target.files;
      const reader = new FileReader();
      reader.readAsDataURL(file)
      reader.onload = ()=>{
        setProfilePic(reader.result) 
      }
    } catch (error) {
      alert(error.message);
    }
  };
  const handelpbcPicChange = (e) => {
    try {
      const [file] = e.target.files;
      const reader = new FileReader();
      reader.readAsDataURL(file)
      reader.onload = ()=>{
        setBcPic(reader.result) 
      }
     
    } catch (error) {
      alert(error.message);
    }
  };
  const handelFormSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(bcPic,profilePic,fullName,bio,website,location))
    // dispatch update profile func
  };
  return (
    <RootModel hideHeader className="edit-profile-model">
      <form method="post" id="profileEditForm" onSubmit={handelFormSubmit}>
      {updatingProfile && <SimpleSpinner/>}
        <div className="edit-profile-header">
          <div className="model-close-btn" onClick={() => navigate(-1)}>
            <i className="far fa-times"></i>
          </div>
          <div className="edit-profile-text-container">
            <span className="edit-profile-text">Edit profile</span>
          </div>
          <div className="edit-profile-btn-container">
            <TextButton
              cBlue
              rounded
              disabled={!fullName || !website || !bio || !location}
              type="submit"
            >
              Save
            </TextButton>
          </div>
        </div>

        <div className="pic-bc-container">
          <div className="bc-pic">
            <input
              type="file"
              accept="image/*"
              alt="profile pic"
              id="bcpic"
              name="bcpic"
              hidden
              multiple={false}
              onChange={handelpbcPicChange}
            ></input>
            <span
              className="edit-icon"
              onClick={() => document.getElementById("bcpic").click()}
            >
              <i className="far fa-camera"></i>
            </span>
            <img src={bcPic} alt="bc" />
          </div>
          <div className="profile-pic">
            <input
              type="file"
              accept="image/*"
              alt="profile pic"
              id="profilePic"
              name="profilePic"
              hidden
              multiple={false}
              onChange={handelProfilePicChange}
            ></input>
            <span
              className="edit-icon"
              onClick={() => document.getElementById("profilePic").click()}
            >
              <i className="far fa-camera"></i>
            </span>
            <img src={profilePic} alt="user-profile-pic" />
          </div>
        </div>
        <div className="user-details-inputs">
          <Input
            placeholder="Name"
            className="user-input"
            onChange={(e) => setFullName(e.target.value)}
            focused={fullName}
            value={fullName}
            name='fullName'
          />
          <Textarea
            placeholder="Bio"
            className="user-input"
            rows={3}
            onChange={(e) => setBio(e.target.value)}
            focused={bio}
            value={bio}
            name='bio'
          />
          <Input
            placeholder="Location"
            className="user-input"
            onChange={(e) => setLocation(e.target.value)}
            focused={location}
            value={location}
            name='location'
          />
          <Input
            placeholder="Website"
            className="user-input"
            onChange={(e) => setWebsite(e.target.value)}
            focused={website}
            value={website}
            name='website'
          />
        </div>
      </form>
    </RootModel>
  );
}
