import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    orders:[],
}
const orderSlice = createSlice({
    name: "Orders",
    initialState,
    reducers: {
        addOrder: (state, action) => {
            state.orders = action.payload;
        }
    }
})
export default orderSlice.reducer;
export const { addOrder } = orderSlice.actions;