const { configureStore } = require("@reduxjs/toolkit");
import accountSlice from "../register-page/registerPage.slice";
import toasterSlice from "../toaster/toasterSlice";
import otpScreenSlice from "../otp-screen/otpScreen.slice";
import loginSlice from "../login/slice";
import dashboardSlice from "../navbar/slice";

const store = configureStore({
   reducer: {
      accountSlice,
      toasterSlice,
      otpScreenSlice,
      loginSlice,
      dashboardSlice,
   },
});

export default store;
