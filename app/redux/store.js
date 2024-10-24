const { configureStore } = require("@reduxjs/toolkit");
import accountSlice from "../register-page/registerPage.slice";
import toasterSlice from "../toaster/toasterSlice";
import otpScreenSlice from "../otp-screen/otpScreen.slice";
import loginSlice from "../login/slice";

const store = configureStore({
   reducer: {
      accountSlice,
      toasterSlice,
      otpScreenSlice,
      loginSlice,
   },
});

export default store;
