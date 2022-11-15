import { AppBar, InputBase, Stack, Toolbar, Typography, Badge, getNativeSelectUtilityClasses } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react'
import { Box } from '@mui/system';
import { useSelector, useDispatch } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import { addStore, setCurrentStore } from '../State Management/Features/User/storeSlice.js';
import Cookies from 'js-cookie';
import { setToken } from '../State Management/Features/tokenSlice.js';
import { addUser } from '../State Management/Features/User/userSlice';



export default function NavBar() {

    const Navigate = useNavigate();
    const { token } = useSelector((state) => state.Token);
    const { user } = useSelector((state) => state.User);
    const { store, currentStore } = useSelector((state) => state.Store);
    const { cartItems } = useSelector((state) => state.Cart);
    const dispatch = useDispatch();



    useEffect(() => {
        if (user !== null) {
            store?.filter((val) => {
                return (val.id === user?.uid)
            }).map((curr, _) => {
                dispatch(setCurrentStore(curr));
            })
        } else {
            dispatch(setCurrentStore(null));
        }
    }, [user]);

    return (
        <>
            <AppBar sx={{ backgroundColor: "seondary.main" }} elevation="0px" position='static'>
                <Toolbar sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Stack sx={{ flexDirection: "row", gap: "80px", alignItems: "center" }}>
                        <Typography variant='h2' sx={{ color: "text.main", fontSize: { md: "25px", xs: "20px" }, cursor: "pointer", overflow: "hidden" }} onClick={() => {
                            Navigate("/");
                        }}>Mero Bazar</Typography>
                    </Stack>
                    {
                        token === null ? <Typography variant='h4' sx={{ marginLeft: { md: "50%", xs: "0%" }, color: "text.main", overflow: "hidden", fontSize: { md: "18px", xs: "16px" }, cursor: "pointer" }} onClick={() => {
                            Navigate("/login");
                        }}>Login</Typography> : <Typography variant='h4' sx={{ marginLeft: { md: "50%", xs: "0%" }, color: "text.main", overflow: "hidden", fontSize: { md: "18px", xs: "16px" }, cursor: "pointer" }} onClick={() => {
                            Cookies.remove('c_user');
                            dispatch(setToken(null));
                            dispatch(addUser(null));
                        }}>Log Out</Typography>
                    }
                    {
                        user === null ? <></> : <Stack sx={{ gap: "0px", cursor: "pointer" }} onClick={() => {
                            Navigate("/orders");
                        }}>
                            <Typography variant='h4' sx={{ color: "text.main", fontSize: "16px", display: { md: "block", xs: "none" }, overflow: "hidden" }}>Hi</Typography>
                            <Typography variant='h5' sx={{ color: "text.main", fontSize: "18px", display: { md: "block", xs: "none" }, overflow: "hidden" }}>{user?.name}</Typography>
                        </Stack>
                    }
                    <Typography variant='h4' sx={{ color: "text.main", fontSize: { md: "18px", xs: "16px" }, cursor: "pointer", overflow: "hidden" }} onClick={() => {
                        if (user !== null) {
                            Navigate("/cart");
                        } else {
                            Navigate("/login");
                        }

                    }}>Cart {cartItems?.length}</Typography>
                </Toolbar>
            </AppBar >
        </>
    )
}
