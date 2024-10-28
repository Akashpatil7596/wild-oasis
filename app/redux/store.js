const { configureStore } = require("@reduxjs/toolkit");
import accountSlice from "../register-page/registerPage.slice";
import toasterSlice from "../toaster/toasterSlice";
import otpScreenSlice from "../otp-screen/otpScreen.slice";
import loginSlice from "../login/slice";
import dashboardSlice from "../navbar/slice";
import userProfileSlice from "../user-profile/userProfile.slice";

const store = configureStore({
   reducer: {
      accountSlice,
      toasterSlice,
      otpScreenSlice,
      loginSlice,
      dashboardSlice,
      userProfileSlice,
   },
});

export default store;
