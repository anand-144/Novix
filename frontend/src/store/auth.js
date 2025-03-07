import { createSlice } from "@reduxjs/toolkit";

// ✅ Retrieve stored token & role
const token = localStorage.getItem("token") || sessionStorage.getItem("token");
const role = localStorage.getItem("role") || sessionStorage.getItem("role");

const authSlice = createSlice({
  name: "auth",
  initialState: { 
    isLoggedIn: !!token, // ✅ If token exists, user is logged in
    role: role || "user" // ✅ Default to "user" if no role is found
  },
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.role = action.payload?.role || "user"; // ✅ Prevents undefined error

      // ✅ Save role in storage
      localStorage.setItem("role", state.role);
      sessionStorage.setItem("role", state.role);
    },
    logout(state) {
      state.isLoggedIn = false;
      state.role = "user"; 
      
      // ✅ Remove token & role on logout
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("role");
    },
    changeRole(state, action) {
      state.role = action.payload || "user"; // ✅ Prevents undefined role

      // ✅ Update role in storage
      localStorage.setItem("role", state.role);
      sessionStorage.setItem("role", state.role);
    }
  }
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
