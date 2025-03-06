import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";  // ✅ Import Provider
import store from "./store"; // ✅ Import Redux store
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>  {/* ✅ Wrap App with Redux Provider */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
