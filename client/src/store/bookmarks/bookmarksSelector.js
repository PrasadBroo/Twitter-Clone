import { createSelector } from "@reduxjs/toolkit";

const selectBookmarks = (state)=> state.bookmarks;
export const selectUserBookmarks = createSelector(selectBookmarks,(selectBookmarks)=>selectBookmarks.bookmarks)