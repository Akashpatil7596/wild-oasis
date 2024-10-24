import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
   success: false,
};

// Redux Toolkit

const otpScreenSlice = createSlice({
   name: "otp",
   initialState: initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(verifyOtpAsync.fulfilled, (state, action) => {
            state.success = action.payload;
         })
         .addCase(verifyOtpAsync.rejected, (state, action) => {
            state.error = action.payload;
         });
   },
});

export const verifyOtpAsync = createAsyncThunk(
   "otp/verifyOtpAsync",
   async (payload, { rejectWithValue }) => {
      try {
         const res = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify-otp`,
            payload,
         );

         return res.data.success;
      } catch (error) {
         console.error("Registration error:", error);

         return rejectWithValue(error.response?.data?.message[0] || "Failed to register");
      }
   },
);

export default otpScreenSlice.reducer;
