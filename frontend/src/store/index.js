import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth"; // ✅ Import auth slice

const store = configureStore({
  reducer: {
    auth: authReducer
  },
});

export default store;
