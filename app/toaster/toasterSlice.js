import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
   error: false,
   message: "",
};

const toasterSlice = createSlice({
   name: "toast",
   initialState: initialState,
   reducers: {
      toaster: {
         prepare(flag, message) {
            return {
               payload: {
                  flag,
                  message,
               },
            };
         },
         reducer(state, action) {
            if (action.payload.flag === false && action.payload.message !== "") {
               toast.error(action.payload.message);
            } else if (action.payload.flag === true && action.payload.message !== "") {
               toast.success(action.payload.message);
            }
         },
      },
   },
});

export const { toaster } = toasterSlice.actions;

export default toasterSlice.reducer;
