import React from "react";
import { useDispatch, useSelector } from "react-redux";
import TextButton from "../../components/Button/TextButton/TextButton";
import { selectUnfollowModel } from "../../store/model/modelSelector";
import { HIDE_UNFOLLOW_MODEL } from "../../store/model/modelSlice";
import { unfollowTheUser } from "../../store/user/userActions";
import RootModel from "../RootModel/RootModel";

export default function UnfollowModel({type}) {
  const state = useSelector((state) => state);
  let model = selectUnfollowModel(state);
  const dispatch = useDispatch();

  const closeModel = ()=>{
      dispatch(HIDE_UNFOLLOW_MODEL())
  }
  return (
    <RootModel hideHeader className="unfollow-model">
      <div className="unfollow-model-wrap">
        <div className="unfollow-model-heading">
          <span className="unfollow-heading-text">Unfollow @{model.userToUnfollow.username}?</span>
        </div>
        <div className="unfollow-text-wrap">
          <span className="unfollow-text">
            Their Tweets will no longer show up in your home timeline. You can
            still view their profile, unless their Tweets are protected
          </span>
        </div>
        <div className="unfollow-btns-wrap">
          <TextButton rounded className="unfollow-btn unfollowbtn" onClick={()=>dispatch(unfollowTheUser(model.userToUnfollow._id,type))}>
            Unfollow
          </TextButton>
          <TextButton
            rounded
            cBlue
            className="unfollow-calcel-btn unfollowbtn"
            onClick={closeModel}
          >
            Cancel
          </TextButton>
        </div>
      </div>
    </RootModel>
  );
}
