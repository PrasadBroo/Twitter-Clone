import {
    createSlice
} from "@reduxjs/toolkit";

const initialState = {
    isNavOpen:false,

}


export const navigationSlice = createSlice({
    name: 'navigation',
    initialState,
    reducers: {
        SHOW_NAVBAR: (state) => {
            state.isNavOpen = true;
        },
        HIDE_NAVBAR: (state) => {
            state.isNavOpen = false;
        },
        TOGGLE_NAVBAR:(state)=>{
            state.isNavOpen = !state.isNavOpen;
        }

    },
})


export const {
    SHOW_NAVBAR,
    HIDE_NAVBAR,
    TOGGLE_NAVBAR,
} = navigationSlice.actions
export default navigationSlice.reducer;