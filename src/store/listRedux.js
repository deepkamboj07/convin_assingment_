import {createSlice} from '@reduxjs/toolkit'
const initialState={
    lists:[],
    history:[],
}

const listRedux=createSlice({
    initialState,
    name:'lists',
    reducers:{
        addList:(state,action)=>
        {
            const name=action.payload;
            state.lists.push({
                title:name,
                contents:[],
            })
        },
        addContents:(state,action)=>
        {
            const name=action.payload.name;
            const url=action.payload.url;
            const index=action.payload.index;

            if(index!==-1 && index<state.lists.length)
            {
                state.lists[index].contents.push({
                    name,
                    url
                })
            }
        },
        deleteContents:(state,action)=>{
            if(action.payload.length===0)return;

            const filterArray = (array1, array2) => {
                const filtered = array1.filter((item,index)=>{
                    return array2.indexOf(index)===-1;
                })
                return filtered;
            };

            action.payload.forEach(item => {
                    state.lists.forEach(list=>{
                        console.log(item.title+'  '+list.title);
                        if(item.title===list.title)
                        {
                            list.contents=filterArray(list.contents,item.items);
                            console.log(list.contents);
                        }
                    })
            });
        },
        updateBucketContent:(state,action)=>{
            const name=action.payload.name;
            const url=action.payload.url;
            const index=action.payload.index;
            const contIndex=action.payload.editIndex;
            
            if(index!==-1 && index<state.lists.length)
            {
                if(contIndex!==-1)
                {
                    state.lists[index].contents[contIndex]={
                        name,
                        url
                    }
                }
            }  
        },
        updateBucket:(state,action)=>{
            const name=action.payload.name;
            const url=action.payload.url;
            const index=action.payload.index;
            const contIndex=action.payload.editIndex;
            const title=action.payload.title;

            if(index!==-1 && index<state.lists.length)
            {
                if(contIndex!==-1)
                {
                    state.lists[index].contents=state.lists[index].contents.filter((item,ix)=>{
                        return ix!==contIndex;
                    })
                }
            }
            
            state.lists.forEach(list=>{
                if(list.title===title)
                {
                    list.contents.push({
                        url,
                        name
                    })
                }
            })

        },
        addHistory:(state,action)=>{
            const title=action.payload.name;
            const url=action.payload.url;
            const date=new Date();
            const hour=date.getHours();
            const minute=date.getMinutes();
            const AmorPm=hour>=12?'PM':'AM';
            const hr=hour%12 || 12;
            const time=hr+':'+minute+" "+AmorPm;
            state.history.push({
                title,
                url,
                time
            });

            if(state.history.length > 15)
            {
                state.history=state.history.reverse();
                state.history.pop();
                state.history=state.history.reverse();
            }
        }
    }
});

export default listRedux.reducer;
export const listAction=listRedux.actions;