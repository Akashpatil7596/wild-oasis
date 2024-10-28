const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
   dashboardVisible: false,
   loading: false,
};

const dashboardSlice = createSlice({
   name: "dashboard",
   initialState: initialState,
   reducers: {
      dadhboardVisible(state, action) {
         state.dashboardVisible = true;
      },
      setLoading(state, action) {
         state.loading = action.payload;
      },
   },
});

export const { dashboardVisible, setLoading } = dashboardSlice.actions;

export default dashboardSlice.reducer;
