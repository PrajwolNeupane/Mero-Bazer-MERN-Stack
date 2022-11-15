import {configureStore} from '@reduxjs/toolkit';
import cartSlice from './State Management/Features/Cart/cartSlice.js';
import orderSlice from './State Management/Features/Order/orderSlice.js';
import productSlice from './State Management/Features/Product/productSlice.js';
import tokenSlice from './State Management/Features/tokenSlice.js';
import storeSlice from './State Management/Features/User/storeSlice';
import userSlice from './State Management/Features/User/userSlice';

export const Store = configureStore({
    reducer:{
        User:userSlice,
        Store:storeSlice,
        Product:productSlice,
        Cart:cartSlice,
        Order:orderSlice,
        Token:tokenSlice
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});