import { createSlice } from '@reduxjs/toolkit';

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        drawer: false,
        id: "",
    },
    reducers: {
        toggleTaskDrawer(state) {
            state.drawer = !state.drawer;
        },
        focusTaskById(state, action) {
            state.id = action.payload;
        }
    },
})

export const { toggleTaskDrawer, focusTaskById } = tasksSlice.actions;
export default tasksSlice.reducer;