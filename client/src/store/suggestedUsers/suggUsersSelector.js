import { createSelector } from "@reduxjs/toolkit";

const selectUsers = (state)=> state.suggestedUsers;


export const selectSuggestedUsers = createSelector(selectUsers,(selectUsers)=>selectUsers.users)



