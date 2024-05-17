import { createSlice } from '@reduxjs/toolkit';

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: [],
    reducers: {
        addTasks(state, action) {
            return state.concat(action.payload);
        }
    },
})

export const { addTasks } = tasksSlice.actions;
export default tasksSlice.reducer;