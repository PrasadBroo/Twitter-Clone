import { createSelector } from "@reduxjs/toolkit";

const selectGuest = (state)=> state.guestUser;


export const selectGuestUser = createSelector(selectGuest,(guestUser)=>guestUser.guestUser)
export const selectGuestFetching = createSelector(selectGuest,guestUser => guestUser.fetching)
export const selectLoginError = createSelector(selectGuest,guestUser => guestUser.signInFail)
