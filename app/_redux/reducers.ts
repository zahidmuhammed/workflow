import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import counterSlice from "./slices/counterSlice";
import tasksSlice from "./slices/tasksSlice";

const AllReducers = {
    user: userSlice,
    counter: counterSlice,
    tasks: tasksSlice,
};

const RootReducer = combineReducers(AllReducers);

const whitelistReducers: string[] = ["user", "counter"];

export { RootReducer, whitelistReducers };
