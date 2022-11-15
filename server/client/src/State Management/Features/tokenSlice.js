import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: null
}

const tokenSlice = createSlice({
    name: "Token",
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        }
    }
})
export default tokenSlice.reducer;
export const { setToken } = tokenSlice.actions;