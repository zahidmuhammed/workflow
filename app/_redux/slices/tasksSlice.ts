import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Task } from "@/app/(pages)/board/board-wrapper";

const initialState: Task[] = [];

export const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<Task>) => {
            state.push(action.payload);
        },
        deleteTask: (state, action: PayloadAction<Task>) => {
            return state.filter(task => task._id !== action.payload._id);
        },
        initTasks: (state, action: PayloadAction<Task[]>) => {
            return action.payload;
        },
        clearTasks: state => {
            return [];
        },
    },
});

export const { addTask, deleteTask, initTasks, clearTasks } = taskSlice.actions;

export default taskSlice.reducer;
