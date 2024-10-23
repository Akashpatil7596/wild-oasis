const { configureStore } = require("@reduxjs/toolkit");
import accountSlice from '../register-page/registerPage.slice'

const store = configureStore({
    reducer: {
        accountSlice
    },
});

export default store;
