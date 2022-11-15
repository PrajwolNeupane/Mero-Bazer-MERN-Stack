import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    store:null,
    currentStore:null
}

const storeSlice = createSlice({
    name:"Store",
    initialState,
    reducers:{
        addStore:(state,action) => {
            state.store = action.payload;
        },
        setCurrentStore : (state,action) =>{
            state.currentStore = action.payload
        }
    }
})
export default storeSlice.reducer;
export const { addStore,setCurrentStore } = storeSlice.actions;