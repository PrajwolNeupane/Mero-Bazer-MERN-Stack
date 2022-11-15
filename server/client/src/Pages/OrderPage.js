import React,{useEffect} from 'react';
import { Box, Stack, Typography } from '@mui/material'
import { useSelector } from 'react-redux';


export default function OrderPage() {

    const { orders } = useSelector((state) => state.Order);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [orders]);

    return (
        <Box sx={{ margin: { md: "20px 4% 0px 4%", sm: "15px 2% 0px 2%", xs: "10px 1% 0px 1%" }, padding: "40px 2%", backgroundColor: "#f2f2eb", display: "flex", flexDirection: "column", gap: "20px" }}>
            <Typography sx={{ color: "text.main", fontSize: { md: "22px", sm: "20px", xs: "18px" } }} variant="h3">Your Orders</Typography>
            <Stack sx={{ flexDirection: "column", gap: "10px" }}>
                {
                    orders.map((curr, _) => (
                        <>
                            <Box sx={{ width: '100%', height: "1px", backgroundColor: "black" }}>
                            </Box>
                            <Typography sx={{ color: "text.main", fontSize: { md: "18px", sm: "16px", xs: "14px" } }} variant="h4"><span style={{fontWeight:500}}>Date : </span>{curr?.date}</Typography>
                            <Typography sx={{ color: "text.main", fontSize: { md: "18px", sm: "16px", xs: "14px" } }} variant="h4"><span style={{fontWeight:500}}>Delivery Address : </span>{curr?.address}</Typography>
                            <Typography sx={{ color: "text.main", fontSize: { md: "18px", sm: "16px", xs: "14px" } }} variant="h4"><span style={{fontWeight:500}}>Phone Number : </span>{curr?.number}</Typography>
                            <Typography sx={{ color: "text.main", fontSize: { md: "18px", sm: "16px", xs: "14px" } }} variant="h4"><span style={{fontWeight:500}}>Total Price : </span>{curr?.price}</Typography>
                            <Typography sx={{ color: "text.main", fontSize: { md: "18px", sm: "16px", xs: "14px" } }} variant="h4"><span style={{fontWeight:500}}>Cash : </span>{curr?.cash}</Typography>
                            {
                                curr?.product.map((curr, indx) => (
                                    <Stack sx={{ flexDirection: "row", gap: "20px", backgroundColor: "white", padding: "5px 10px", alignItems: "center" }} key={indx}>
                                        <img src={curr?.image} style={{ width: "200px", height: "200px", objectFit: "contain" }} />
                                        <Stack sx={{ flexDirection: "column", gap: "2px" }}>
                                            <Typography sx={{ color: "text.main", fontSize: "20px" }} variant="h4">{curr?.name}</Typography>
                                            <Typography sx={{ color: "text.main", fontSize: "16px" }} variant="h5">{curr?.description}</Typography>
                                            <Typography sx={{ color: "text.main", fontSize: "18px" }} variant="h4">Price : Rs {curr?.price}</Typography>
                                            <Typography sx={{ color: "text.main", fontSize: "18px" }} variant="h4">Type : {curr?.type}</Typography>
                                        </Stack>
                                    </Stack>
                                ))
                            }
                        </>
                    ))
                }

            </Stack>
        </Box>
    )
}
