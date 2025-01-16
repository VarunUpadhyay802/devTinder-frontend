import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "requests",
  initialState: null,
  reducers: {
    addRequests: (state, action) => {
      //initially the state is null
      return action.payload;
    },
    removremovRequest: (state, action) => {
      //state here is array , so you have to remove that particular ID from the array
      const newArray = state.filter((request) =>{
        request._id !== action.payload ;
      })
      return newArray
    },
  },
});
export const { addRequests , removremovRequest} = requestSlice.actions;
export default requestSlice.reducer;
