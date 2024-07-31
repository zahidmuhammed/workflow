import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Task } from "@/app/(pages)/board/board-wrapper";

const initialState: Partial<Task>[] = [];

export const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<Task>) => {
            state.push(action.payload);
        },
        updateTaskStatus: (state, action: PayloadAction<Partial<Task>>) => {
            const index = state.findIndex(
                task => task._id === action.payload._id
            );
            if (index !== -1) {
                state[index].status = action.payload.status;
            }
        },
        deleteTask: (state, action: PayloadAction<Partial<Task>>) => {
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

export const { addTask, deleteTask, initTasks, clearTasks, updateTaskStatus } =
    taskSlice.actions;

export default taskSlice.reducer;
