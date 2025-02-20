import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import taskReducer from "./taskSlice";
import userReducer from "./userSlice";

export const store = configureStore({
    reducer: {
        users: userReducer,
        tasks: taskReducer,
        auth: authReducer,
    },
});
