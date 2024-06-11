import { createSlice } from '@reduxjs/toolkit';

const dealsSlice = createSlice({
    name: 'deals',
    initialState: {
        drawer: false,
        deal: null,
    },
    reducers: {
        toggleDealDrawer(state) {
            state.drawer = !state.drawer;
        },
        focusDealById(state, action) {
            state.deal = action.payload;
        }
    },
})

export const { toggleDealDrawer, focusDealById } = dealsSlice.actions;
export default dealsSlice.reducer;