import { createSlice } from "@reduxjs/toolkit";

const initialState={
    theme:'dark',
}

const themeStore=createSlice({
    initialState,
    name:'themes',
    reducers:{
        applyDark(state)
        {
            state.theme='dark';
        },
        applyLight(state)
        {
            state.theme='light';
        }
    }
});

export const themAction=themeStore.actions;
export default themeStore.reducer;