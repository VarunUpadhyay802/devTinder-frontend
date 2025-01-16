import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "requests",
  initialState: null,
  reducers: {
    addRequests: (state, action) => {
      //initially the state is null
      return action.payload;
    },
    removremovRequests: (state, action) => {
      return null;
    },
  },
});
export const { addRequests } = requestSlice.actions;
export default requestSlice.reducer;
