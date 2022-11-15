import { Box, Stack, Typography, InputBase, Button } from '@mui/material'
import React, { useState } from 'react';
import setCookie from '../hooks/setCookie.js';
import getCookie from '../hooks/getCookie.js';
import { setToken } from '../State Management/Features/tokenSlice.js';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function SellerLogin() {

    const [name, setName] = useState("");
    const dispatch = useDispatch();
    const [nameError, setNameError] = useState("");
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [address, setAddress] = useState("");
    const [addressError, setAddressError] = useState("");
    const [phone, setPhone] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [formData, setFormData] = useState({});
    const [image, setImage] = useState(null);

    const Navigate = useNavigate();

    const onHandleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const registerStore = async () => {
        try {
            const res = await axios.post("/user/create/store", { ...formData, image: image }, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            setCookie("c_user", res.data.token);
            dispatch(setToken(getCookie("c_user") === undefined ? null : getCookie("c_user")));
            Navigate("/");
        } catch (e) {

        }

    }



    return (
        <Box sx={{ width: { md: "30%", sm: "50%", xs: "70%" }, margin: { md: "35px auto", sm: "20px auto", xs: "10px auto" }, padding: "15px 20px", backgroundColor: "#f2f2eb", boxShadow: "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px" }}>
            <Stack sx={{ alignItems: "flex-start", gap: "20px" }}>
                <Typography variant='h2' sx={{ fontSize: "25px", color: "text.main" }}>Become a Seller</Typography>
                <Stack sx={{ gap: "5px" }}>
                    <Typography variant='h4' sx={{ fontSize: "14px", color: "text.main" }}>Store Name</Typography>
                    <Box sx={{ width: "400px", backgroundColor: "white", padding: "2px 0px 2px 5px" }}>
                        <InputBase fullWidth type='text' placeholder='Name' name="name" onChange={onHandleChange} />
                    </Box>
                    {
                        nameError !== "" ? <Typography sx={{ fontSize: "12px", color: "red" }}>{nameError}</Typography> : <></>
                    }
                </Stack>
                <Stack sx={{ gap: "5px" }}>
                    <Typography variant='h4' sx={{ fontSize: "14px", color: "text.main" }}>Store Email</Typography>
                    <Box sx={{ width: "400px", backgroundColor: "white", padding: "2px 0px 2px 5px" }}>
                        <InputBase fullWidth type='text' placeholder='Email' name="email" onChange={onHandleChange} />
                    </Box>
                    {
                        emailError !== "" ? <Typography sx={{ fontSize: "12px", color: "red" }}>{emailError}</Typography> : <></>
                    }
                </Stack>
                <Stack sx={{ gap: "5px" }}>
                    <Typography variant='h4' sx={{ fontSize: "14px", color: "text.main" }}>Store Description</Typography>
                        <textarea placeholder='Description' name='description' onChange={onHandleChange} type="text" style={{width:"400px",height:"100px",padding: "2px",resize:"none",border:"none",outline:"none",fontSize:"16px"}}/>
                </Stack>
                <Stack sx={{ gap: "5px" }}>
                    <Typography variant='h4' sx={{ fontSize: "14px", color: "text.main" }}>Store Password</Typography>
                    <Box sx={{ width: "400px", backgroundColor: "white", padding: "2px 0px 2px 5px" }}>
                        <InputBase fullWidth type='password' placeholder='Password' name="password" onChange={onHandleChange} />
                    </Box>
                    {
                        passwordError !== "" ? <Typography sx={{ fontSize: "12px", color: "red" }}>{passwordError}</Typography> : <></>
                    }
                </Stack>
                <Stack sx={{ gap: "5px" }}>
                    <Typography variant='h4' sx={{ fontSize: "14px", color: "text.main" }}>Store Address</Typography>
                    <Box sx={{ width: "400px", backgroundColor: "white", padding: "2px 0px 2px 5px" }}>
                        <InputBase fullWidth type='text' placeholder='Address' name="address" onChange={onHandleChange} />
                    </Box>
                    {
                        addressError !== "" ? <Typography sx={{ fontSize: "12px", color: "red" }}>{addressError}</Typography> : <></>
                    }
                </Stack>
                <Stack sx={{ gap: "5px" }}>
                    <Typography variant='h4' sx={{ fontSize: "14px", color: "text.main" }}>Store Telphone Number</Typography>
                    <Box sx={{ width: "400px", backgroundColor: "white", padding: "2px 0px 2px 5px" }}>
                        <InputBase fullWidth type='tel' placeholder='Number' name="phone" onChange={onHandleChange} />
                    </Box>
                    {
                        phoneError !== "" ? <Typography sx={{ fontSize: "12px", color: "red" }}>{phoneError}</Typography> : <></>
                    }
                </Stack>
                {
                    image === null ? <Typography variant='h4' sx={{ fontSize: "14px", color: "text.main" }}>Choose Store Image</Typography> : <img src={URL.createObjectURL(image)} style={{ height: "100px", width: "100px", objectFit: "cover" }} />
                }
                <input type={"file"} id="btn" style={{ display: "none" }} onChange={(e) => {
                    if (e.target.files[0]) {
                        setImage(e.target.files[0]);
                    }
                }} />
                <Button sx={{
                    width: "100%",
                    padding: "2px 0px",
                    color: "white",
                    backgroundColor: "secondary.light", "&:hover": {
                        backgroundColor: "secondary.main"
                    },
                    borderRadius: "0px",
                }} onClick={() => {
                    document.getElementById('btn').click();
                }}>
                    Choose Store Photo
                </Button>

                <Button sx={{
                    width: "100%",
                    color: "white",
                    backgroundColor: "secondary.light", "&:hover": {
                        backgroundColor: "secondary.main"
                    },
                    borderRadius: "0px",
                }} onClick={() => {
                    registerStore();
                }}>
                    Create Seller Account
                </Button>
                <Typography sx={{
                    margin: "0px auto", fontSize:
                        "14px", color: "text.main"
                }} variant='h5'>
                    Have an account ?
                </Typography>
                <Typography sx={{
                    margin: "0px auto", fontSize: "16px", color: "secondary.main", cursor: "pointer"
                }} variant='h3' onClick={() => {
                    Navigate("/login");
                }}>
                    Log in here.
                </Typography>
            </Stack>

        </Box>
    )
}
