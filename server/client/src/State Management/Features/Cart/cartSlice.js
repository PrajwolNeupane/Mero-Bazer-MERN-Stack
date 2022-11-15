import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartItems:[],
}
const cartSlice = createSlice({
    name: "Carts",
    initialState,
    reducers: {
        addCart: (state, action) => {
            state.cartItems = action.payload;
        }
    }
})
export default cartSlice.reducer;
export const { addCart } = cartSlice.actions;