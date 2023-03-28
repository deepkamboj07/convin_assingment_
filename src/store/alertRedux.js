import { createSlice } from "@reduxjs/toolkit";

const initialState={
    show:false,
    type:'',
    message:''
}

const alert=createSlice({
    initialState,
    name:'alert',
    reducers:{
        setAlert:(state,action)=>
        {
            state.show=true;
            state.type=action.payload.type;
            state.message=action.payload.message;
        },
        closeAlert:(state)=>
        {
            state.show=false;
        }
    }
});

export default alert.reducer;
export const alertAction=alert.actions;