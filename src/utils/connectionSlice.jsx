import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
  name: "connection",
  initialState: null , 
  reducers: {
    addConnection: (state, action) => {
      //initially the state is null
      return action.payload;
    },
    removeConnections: (state, action) => {
      return null;
    },
  },
});
export const { addConnection , removeConnections} = connectionSlice.actions;
export default connectionSlice.reducer;
