import cogoToast from "cogo-toast";
import React from "react";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import TextButton from "../../components/Button/TextButton/TextButton";
import { unfollowUser } from "../../services/userServices";
import { selectUnfollowModel } from "../../store/model/modelSelector";
import { HIDE_UNFOLLOW_MODEL } from "../../store/model/modelSlice";
import RootModel from "../RootModel/RootModel";

export default function UnfollowModel() {
  const state = useSelector((state) => state);
  let model = selectUnfollowModel(state);
  const dispatch = useDispatch();

  const closeModel = () => {
    dispatch(HIDE_UNFOLLOW_MODEL());
  };
  const mutation = useMutation(unfollowUser, {
    onSuccess: () => {
      closeModel()
    },
    onError:(error)=>{
      cogoToast.error(error.message)
    }
  })
  return (
    <RootModel hideHeader className="unfollow-model">
      <div className="unfollow-model-wrap">
        <div className="unfollow-model-heading">
          <span className="unfollow-heading-text">
            Unfollow @{model.userToUnfollow.username}?
          </span>
        </div>
        <div className="unfollow-text-wrap">
          <span className="unfollow-text">
            Their Tweets will no longer show up in your home timeline. You can
            still view their profile, unless their Tweets are protected
          </span>
        </div>
        <div className="unfollow-btns-wrap">
          <TextButton
          disabled={mutation.isLoading}
            rounded
            className="unfollow-btn unfollowbtn"
            onClick={() =>
              mutation.mutate(model.userToUnfollow._id)
            }
          >
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
