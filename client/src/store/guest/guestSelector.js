import { createSelector } from "@reduxjs/toolkit";

const selectGuest = (state)=> state.guestUser;


export const selectGuestUser = createSelector(selectGuest,(guestUser)=>guestUser.guestUser)
export const selectGuestFetching = createSelector(selectGuest,guestUser => guestUser.fetching)
export const selectLoginError = createSelector(selectGuest,guestUser => guestUser.signInFail)
export const selectFollowers = createSelector(selectGuest,guestUser => guestUser.followers)
export const selectIsFollowersFetching = createSelector(selectGuest,guestUser => guestUser.fetchingFollowers)


export const selectFollowings = createSelector(selectGuest,guestUser => guestUser.followings)
export const selectIsFollowingsFetching = createSelector(selectGuest,guestUser => guestUser.fetchingFollowings)
