import { createSlice } from "@reduxjs/toolkit";

const initialState={
    select:'',
}

const slice=createSlice({
    initialState,
    name:'select',
    reducers:{
        setSelect:(state,action)=>
        {
            state.select=action.payload;
        }
    }
});

export default slice.reducer;
export const selectAction=slice.actions;