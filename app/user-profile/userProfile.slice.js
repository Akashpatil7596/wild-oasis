import axios from "axios";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
   success: false,
   successMessage: "",
   error: false,
   errorMessage: "",
   data: {},
};

const userProfileSlice = createSlice({
   name: "userProfile",
   initialState: initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(fetchData.fulfilled, (state, action) => {
            state.success = true;
            state.successMessage = action?.payload?.message;
            state.data = action?.payload?.data;
            state.error = false;
            state.errorMessage = "";
         })
         .addCase(fetchData.rejected, (state, action) => {
            state.error = true;
            state.errorMessage = action?.payload?.message
               ? action?.payload?.message
               : action?.payload;
         });
   },
});

export const fetchData = createAsyncThunk(
   "userProfile/fetchData",
   async (payload, { rejectWithValue }) => {
      try {
         const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/${payload.id}`, {
            headers: {
               Authorization: `Bearer ${payload.token}`,
            },
         });

         if (!res.data.success) {
            return rejectWithValue(res.data);
         }

         return res.data;
      } catch (error) {
         return rejectWithValue(error.response?.data?.message || "Failed to fetch user data");
      }
   },
);

export default userProfileSlice.reducer;
