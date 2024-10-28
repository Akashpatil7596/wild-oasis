import axios from "axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
   success: false,
   successMessage: "",
   error: false,
   errorMessage: "",
   data: "",
};

const loginSlice = createSlice({
   name: "login",
   initialState: initialState,
   reducers: {
      falseError(state, action) {
         state.error = false;
      },
      falseSuccess(state, action) {
         state.success = false;
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(loginAsync.fulfilled, (state, action) => {
            state.success = action.payload.success;
            state.successMessage = action.payload.message;
            state.data = action.payload.data;
            state.error = false;
            state.errorMessage = "";
         })
         .addCase(loginAsync.rejected, (state, action) => {
            state.error = true;
            state.errorMessage = action.payload;
         });
   },
});

export const { falseError, falseSuccess } = loginSlice.actions;

export const loginAsync = createAsyncThunk(
   "login/loginAsync",
   async (payload, { rejectWithValue }) => {
      try {
         const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, payload);

         if (res.data.success) {
            return res.data;
         } else {
            return rejectWithValue(res?.data?.message || "Failed to login");
         }
      } catch (error) {
         console.error("Registration error:", error);

         return rejectWithValue(error.response?.data?.message[0] || "Failed to register");
      }
   },
);

export default loginSlice.reducer;
