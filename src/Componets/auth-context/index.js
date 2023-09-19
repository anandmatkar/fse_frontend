import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-reducer";
import manageEmailReducer from "./manage-email-reducer.js";

const store = configureStore({ reducer: { auth: authReducer } });

export default store;
