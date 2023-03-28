import { createSlice } from "@reduxjs/toolkit";

const initialState={
    selectedItems:[],
}

const slice=createSlice({
    initialState,
    name:'deleteSelect',
    reducers:{
        setSelect:(state,action)=>
        {
            const ind=state.selectedItems.findIndex(item=>item?.title===action.payload.title);
            if(ind===-1)
            {
                state.selectedItems.push({
                    title:action.payload.title,
                    items:[action.payload.index]
                })
            }
            else
            {
                state.selectedItems[ind].items.push(action.payload.index);
            }
        },
        removeSelect:(state,action)=>{
            const ind=state.selectedItems.findIndex(item=>item?.title===action.payload.title);
           if(ind!==-1)
           {
                state.selectedItems[ind].items=state.selectedItems[ind].items.filter(item=>{
                    return item!==action.payload.index
                })
           }
        },
        remove:(state)=>{
            state.selectedItems=[];
        }
    }
});

export default slice.reducer;
export const deleteAction=slice.actions;