import { Box, Button, Stack, Typography, Snackbar } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { addCart } from '../State Management/Features/Cart/cartSlice.js';
import axios from 'axios';

export default function CartPage() {

    const { cartItems } = useSelector((state) => state.Cart);
    const { token } = useSelector((state) => state.Token);
    const [price, setPrice] = useState(0);
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const [openSnack, setSnack] = useState(false);

    useEffect(() => {
        const totalPrice = () => {
            var temp = 0;
            cartItems?.forEach((curr, _) => {
                temp = Number(temp) + Number(`${curr.price}`);
            });
            setPrice(temp);
        }
        totalPrice();
    }, [cartItems]);

    const removeAll = async () => {
        try {
            const res = await axios.post("/cart/delete", {
                owner: token
            })
            if (res.data) {
                dispatch(addCart([]));
                setSnack(true);
            }
        } catch (e) {
            console.log(e);
        }
    }
    const removeCart = async (id) => {
        try {

            const res = await axios.post(`/cart/delete/${id}`, {
                owner: token
            });
            setSnack(true);


        } catch (e) {
            console.log(e);
        }
        const getCartItem = async () => {
            try {
                const res = await axios.post("/cart/", {
                    owner: token
                });
                dispatch(addCart(res.data.cart.item));
            } catch (e) {
                console.log(e);
            }
        }
        getCartItem();
    }

    return (
        <Box sx={{ margin: { md: "20px 4% 0px 4%", sm: "15px 2% 0px 2%", xs: "10px 1% 0px 1%" }, padding: "40px 2%", backgroundColor: "#f2f2eb", display: "flex", flexDirection: "column", gap: "10px" }}>
            <Stack sx={{ flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between" }}>
                <Typography sx={{ color: "text.main", fontSize: "22px" }} variant="h3">
                    Your Cart Items
                </Typography>
                <Stack sx={{ backgroundColor: "otherColor.light", padding: "5px 20px", borderRadius: "3px", border: "1px solid gray", gap: "3px" }}>
                    <Typography sx={{ color: "text.main", fontSize: "16px" }} variant="h4">Total Item : {cartItems.length}</Typography>
                    <Typography sx={{ color: "text.main", fontSize: "16px" }} variant="h4">Total Price : Rs {price}</Typography>
                    {
                        cartItems.length !== 0 ? <><Button sx={{
                            width: "100%",
                            padding: "2px 0px",
                            color: "white",
                            backgroundColor: "secondary.light", "&:hover": {
                                backgroundColor: "secondary.main"
                            },
                            borderRadius: "0px",
                        }} onClick={() => {
                            Navigate("/payment");
                        }}>
                            Buy
                        </Button>
                            <Button sx={{
                                width: "100%",
                                padding: "2px 0px",
                                color: "white",
                                backgroundColor: "secondary.light", "&:hover": {
                                    backgroundColor: "secondary.main"
                                },
                                borderRadius: "0px",
                            }} onClick={() => {
                                removeAll();
                            }}>
                                Remove all
                            </Button></> : <></>
                    }
                </Stack>
            </Stack>
            <Box sx={{ width: '100%', height: "1px", backgroundColor: "black" }}>
            </Box>
            <Stack sx={{ flexDirection: "column", gap: "20px" }}>
                {
                    cartItems.length !== 0 ? <> {
                        cartItems.map((curr, indx) => (
                            <Stack sx={{ flexDirection: "row", gap: "20px", backgroundColor: "white", padding: "5px 10px", alignItems: "center" }} key={indx}>
                                <img src={curr?.image} style={{ width: "200px", height: "200px", objectFit: "contain" }} />
                                <Stack sx={{ flexDirection: "column", gap: "2px" }}>
                                    <Typography sx={{ color: "text.main", fontSize: "20px" }} variant="h4">{curr?.name}</Typography>
                                    <Typography sx={{ color: "text.main", fontSize: "16px" }} variant="h5">{curr?.description}</Typography>
                                    <Typography sx={{ color: "text.main", fontSize: "18px" }} variant="h4">Price : Rs {curr?.price}</Typography>
                                    <Typography sx={{ color: "text.main", fontSize: "18px" }} variant="h4">Type : {curr?.type}</Typography>
                                    <Button sx={{
                                        width: "150px",
                                        padding: "2px 0px",
                                        color: "white",
                                        backgroundColor: "secondary.light", "&:hover": {
                                            backgroundColor: "secondary.main"
                                        },
                                        borderRadius: "0px",
                                    }} onClick={() => {
                                        removeCart(curr?._id);
                                    }}>
                                        Remove
                                    </Button>
                                </Stack>
                            </Stack>
                        ))
                    }</> : <Stack sx={{ alignItems: "center", justifyContent: "center", margin: "100px 0px" }}>
                        <Typography sx={{ color: "text.main", fontSize: "20px" }} variant="h3">Your Cart is Empty</Typography>
                    </Stack>
                }
            </Stack>
            <Snackbar
                open={openSnack}
                autoHideDuration={2000}
                onClose={() => {
                    setSnack(false);
                }}
                message="Removed from Cart"
            />
        </Box>
    )
}
