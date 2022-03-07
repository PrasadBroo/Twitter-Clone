import { createSelector } from "@reduxjs/toolkit";

const selectUser = (state)=> state.user;


export const selectCurrentUser = createSelector(selectUser,(user)=>user.currentUser)
export const selectUpdatingProfile = createSelector(selectUser,(user)=>user.updatingProfile)
export const selectFetching = createSelector(selectUser,user => user.fetching)
export const selectLoginError = createSelector(selectUser,user => user.signInFail)
export const selectSingupError = createSelector(selectUser,user => user.signUpFail)
export const selectLoginStart = createSelector(selectUser,user => user.signInStart)
export const selectSingupStart = createSelector(selectUser,user => user.signUPStart)