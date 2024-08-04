import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface UserState {
    id?: number;
    name?: string;
    email?: string;
    role?: string;
}

// Define the initial state using that type
const initialState: Partial<UserState> = {};

export const userSlice = createSlice({
    name: "user",
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.role = action.payload.role;
        },
    },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
