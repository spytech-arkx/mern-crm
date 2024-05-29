import { createSlice } from '@reduxjs/toolkit';

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        drawer: false,
        task: null,
    },
    reducers: {
        toggleTaskDrawer(state) {
            state.drawer = !state.drawer;
        },
        focusTaskById(state, action) {
            state.task = action.payload;
        }
    },
})

export const { toggleTaskDrawer, focusTaskById } = tasksSlice.actions;
export default tasksSlice.reducer;