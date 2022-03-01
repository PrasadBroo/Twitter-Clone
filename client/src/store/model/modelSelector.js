import { createSelector } from "@reduxjs/toolkit";

const selectModel = (state)=> state.model;


export const selectUnfollowModel = createSelector(selectModel,(selectModel)=>selectModel.unfollowModel)


