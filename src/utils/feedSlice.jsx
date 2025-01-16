import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => {
      //initially the state is null
      return action.payload;
    },
    removeUserFromFeed: (state, action) => {
      //existing feed is our state , action.payload is the ID which we are sending , so if that's not equal to the user ID then filter it
      const newFeed = state.filter((user) => user._id !== action.payload);
      return newFeed;
    },
  },
});
export const { addFeed , removeUserFromFeed} = feedSlice.actions;
export default feedSlice.reducer;
