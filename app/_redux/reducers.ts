import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import counterSlice from "./slices/counterSlice";

const AllReducers = {
    user: userSlice,
    counter: counterSlice,
};

const RootReducer = combineReducers(AllReducers);

const whitelistReducers: string[] = ["user", "counter"];

export { RootReducer, whitelistReducers };
