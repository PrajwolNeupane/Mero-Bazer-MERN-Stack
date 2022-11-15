import { Box, Button, InputBase, Modal, Stack, Typography } from '@mui/material'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import axios from 'axios';
import setCookie from '../hooks/setCookie.js';
import getCookie from '../hooks/getCookie.js';
import { setToken } from '../State Management/Features/tokenSlice.js';
import { useSelector, useDispatch } from 'react-redux';



export default function Login() {

    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const [createUser, setCreateUser] = useState({});
    const [loginUser, setLoginUser] = useState({});
    const [isCreate, setCreate] = useState(false);
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [loading, setLoading] = useState(false);

    const onHandelCreateChange = (e) => {
        setCreateUser({
            ...createUser,
            [e.target.name]:e.target.value
        })
    }
    const onHandelLoginChange = (e) => {
        setLoginUser({
            ...loginUser,
            [e.target.name]:e.target.value
        })
    }

    const addUser = async () => {
        setLoading(true);
        try {
            const res = await axios.post("/user/create/user", createUser);
            setLoading(false);
            setCookie("c_user",res.data.token);
            dispatch(setToken(getCookie("c_user") === undefined ? null : getCookie("c_user")));
            Navigate("/");
        } catch (e) {
            setLoading(false);
            alert(e);
        }

    }

    const logIn = async () => {
        setLoading(true);
        try {
            const res = await axios.post("/user/login", loginUser);
            setLoading(false);
            setCookie("c_user",res.data.token);
            dispatch(setToken(getCookie("c_user") === undefined ? null : getCookie("c_user")));
            Navigate("/");
        } catch (e) {
            setLoading(false);
            alert(e);
        }
    }


    return (
        <>
            <Box sx={{ width: { md: "30%", sm: "50%", xs: "70%" }, margin: { md: "100px auto 10px auto", sm: "50px auto 10px auto", xs: "25px auto 10px auto" }, padding: "25px 20px", backgroundColor: "#f2f2eb", boxShadow: "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px" }}>
                {
                    isCreate === false ?
                        <Stack sx={{ alignItems: "flex-start", gap: "20px" }}>
                            <Typography variant='h2' sx={{ fontSize: "35px", color: "text.main" }}>Log in</Typography>
                            <Stack sx={{ gap: "5px" }}>
                                <Typography variant='h4' sx={{ fontSize: "14px", color: "text.main" }}>User Email</Typography>
                                <Box sx={{ width: "400px", backgroundColor: "white", padding: "2px 0px 2px 5px" }}>
                                    <InputBase fullWidth type='text' placeholder='Email' name="email" onChange={onHandelLoginChange} />
                                </Box>
                                {
                                    passwordError === "" ? <></> : <Typography sx={{ color: "red", fontSize: "13px" }} variant="h5" >{passwordError}</Typography>
                                }
                            </Stack>
                            <Stack sx={{ gap: "5px" }}>
                                <Typography variant='h4' sx={{ fontSize: "14px", color: "text.main" }}>User Password</Typography>
                                <Box sx={{ width: "400px", backgroundColor: "white", padding: "2px 0px 2px 5px" }}>
                                    <InputBase fullWidth type='password' placeholder='Password' name='password' onChange={onHandelLoginChange}  />
                                </Box>
                                {
                                    emailError === "" ? <></> : <Typography sx={{ color: "red", fontSize: "13px" }} variant="h5" >{emailError}</Typography>
                                }
                            </Stack>
                            <Button sx={{
                                width: "100%",
                                color: "white",
                                backgroundColor: "secondary.light", "&:hover": {
                                    backgroundColor: "secondary.main"
                                },
                                borderRadius: "0px",
                            }} onClick={() => {
                                logIn();
                            }}>
                                Log in
                            </Button>
                            <Typography sx={{
                                margin: "0px auto", fontSize:
                                    "14px", color: "text.main"
                            }} variant='h5'>
                                Doesn't have an account ?
                            </Typography>
                            <Typography sx={{
                                margin: "0px auto", fontSize:
                                    "16px", color: "secondary.main", cursor: "pointer"
                            }} variant='h3' onClick={() => {
                                setCreate(true);
                            }}>
                                Create an Account
                            </Typography>
                        </Stack> :
                        <Stack sx={{ alignItems: "flex-start", gap: "20px" }}>
                            <Typography variant='h2' sx={{ fontSize: "35px", color: "text.main" }}>Create an Account</Typography>
                            <Stack sx={{ gap: "5px" }}>
                                <Typography variant='h4' sx={{ fontSize: "14px", color: "text.main" }}>User Name</Typography>
                                <Box sx={{ width: "400px", backgroundColor: "white", padding: "2px 0px 2px 5px" }}>
                                    <InputBase fullWidth type='text' placeholder='Name' name='name' onChange={onHandelCreateChange} />
                                </Box>
                                {
                                    nameError === "" ? <></> : <Typography sx={{ color: "red", fontSize: "13px" }} variant="h5" >{nameError}</Typography>
                                }
                            </Stack>
                            <Stack sx={{ gap: "5px" }}>
                                <Typography variant='h4' sx={{ fontSize: "14px", color: "text.main" }}>User Email</Typography>
                                <Box sx={{ width: "400px", backgroundColor: "white", padding: "2px 0px 2px 5px" }}>
                                    <InputBase fullWidth type='text' placeholder='Email' name='email' onChange={onHandelCreateChange} />
                                </Box>
                                {
                                    emailError === "" ? <></> : <Typography sx={{ color: "red", fontSize: "13px" }} variant="h5" >{emailError}</Typography>
                                }
                            </Stack>
                            <Stack sx={{ gap: "5px" }}>
                                <Typography variant='h4' sx={{ fontSize: "14px", color: "text.main" }}>User Password</Typography>
                                <Box sx={{ width: "400px", backgroundColor: "white", padding: "2px 0px 2px 5px" }}>
                                    <InputBase fullWidth type='password' placeholder='Password' name="password" onChange={onHandelCreateChange} />
                                </Box>
                                {
                                    passwordError === "" ? <></> : <Typography sx={{ color: "red", fontSize: "13px" }} variant="h5" >{passwordError}</Typography>
                                }
                            </Stack>
                            <Button sx={{
                                width: "100%",
                                color: "white",
                                backgroundColor: "secondary.light", "&:hover": {
                                    backgroundColor: "secondary.main"
                                },
                                borderRadius: "0px",
                            }} onClick={() => {
                                addUser();
                            }}>
                                Create an Account
                            </Button>
                            <Typography sx={{
                                margin: "0px auto", fontSize:
                                    "14px", color: "text.main"
                            }} variant='h5'>
                                Have an account ?
                            </Typography>
                            <Typography sx={{
                                margin: "0px auto", fontSize:
                                    "16px", color: "secondary.main", cursor: "pointer"
                            }} variant='h3' onClick={() => {
                                setCreate(false);
                            }}>
                                Log in here
                            </Typography>
                        </Stack>
                }
            </Box>
            <Typography sx={{
                width: "30%", margin: "10px auto", textAlign: "center", fontSize:
                    "16px", color: "text.main", cursor: "pointer"
            }} onClick={() => {
                Navigate("/");
            }}>Sign in later</Typography>
            <Modal open={loading} onClose={() => {
            }}>
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: { md: "30%", sm: "50%", xs: "70%" },
                    bgcolor: '#f2f2eb',
                    p: 4,
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    alignItems: "center"
                }}>
                    <ClipLoader loading={loading} color="#1b1c1f" />
                </Box>
            </Modal>
        </>
    )
}
