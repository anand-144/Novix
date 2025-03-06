import { createSlice } from "@reduxjs/toolkit";

// ✅ Check both `localStorage` & `sessionStorage`
const token = localStorage.getItem("token") || sessionStorage.getItem("token");
const role = localStorage.getItem("role") || sessionStorage.getItem("role");

const authSlice = createSlice({
  name: "auth",
  initialState: { 
    isLoggedIn: !!token, // ✅ If token exists in either storage, user is logged in
    role: role || "user"
  },
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.role = "user"; 
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("role");
    },
    changeRole(state, action) {
      state.role = action.payload;
    }
  }
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
