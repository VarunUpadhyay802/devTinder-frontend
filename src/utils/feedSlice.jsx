import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name : 'feed' , 
    initialState :null , 
    reducers :{
         addFeed : (state , action) =>{
             //initially the state is null
            return action.payload
         },
         removeFeed : (state , action)=>{
            return null ; 
         }
    }
})
export const {addFeed} = feedSlice.actions ; 
export default feedSlice.reducer;
