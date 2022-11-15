import Footer from "./Components/Footer";
import HomeSlider from "./Components/HomeSlider";
import NavBar from "./Components/NavBar";
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from "./Pages/HomePage";
import CategoryWrapper from "./Pages/CategoryWrapper";
import ProductPage from "./Pages/ProductPage";
import Login from "./Pages/Login";
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addUser } from './State Management/Features/User/userSlice.js';
import { addStore, setCurrentStore } from './State Management/Features/User/storeSlice.js';
import { addCart } from './State Management/Features/Cart/cartSlice.js';
import { addOrder } from './State Management/Features/Order/orderSlice.js';
import { Typography, Stack, Box } from "@mui/material";
import { addProducts } from './State Management/Features/Product/productSlice.js';
import SellerLogin from "./Pages/SellerLogin";
import StorePage from "./Pages/StorePage";
import ProtectiveRoute from "./Components/ProtectiveRoute";
import CartPage from './Pages/CartPage.js';
import BuyPage from "./Pages/BuyPage";
import OrderPage from "./Pages/OrderPage";
import { BarLoader } from 'react-spinners';
import axios from 'axios';
import { setToken } from './State Management/Features/tokenSlice.js';
import getCookie from './hooks/getCookie.js';


function App() {


  const { user } = useSelector((state) => state.User);
  const { token } = useSelector((state) => state.Token);
  const { store } = useSelector((state) => state.Store);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    dispatch(setToken(getCookie("c_user") === undefined ? null : getCookie("c_user")));
  }, []);

  useEffect(() => {
    async function getUserInfo() {
      return axios.post("/user/me", { token: token });
    }
    const getCartItem = async () => {
      if(token){
        try {
          const res = await axios.post("/cart/", {
            owner: token
          });
          dispatch(addCart(res.data.cart.item));
        } catch (e) {
          console.log(e);
        }
      }else{
        dispatch(addCart([]));
      }
    }
    const getOrderItem = async () => {
      if (token) {
        const data = parseJwt(token);
        try {
          const res = await axios.post("/order/getOrder", {
            owner: data.id
          });
          dispatch(addOrder(res.data))
        } catch (error) {
          console.log(error)
        }
      } else {
        dispatch(addOrder([]))
      }
    }
    getCartItem();
    getOrderItem();

    setTimeout(async function () {
      setLoading(false);
      const { data } = await getUserInfo();
      dispatch(addUser(data));
    }, 1500);
  }, [token]);

  function parseJwt(token) {
    if (!token) {
      return;
    }
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  }



  useEffect(() => {

    const getStore = async () => {
      try {
        const res = await axios.get("/user/store");
        dispatch(addStore(res.data));
      } catch (e) {
        console.log(e);
      }
    }
    getStore();
  }, [user]);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get("/product/");
        dispatch(addProducts(res.data));

      } catch (e) {
        console.log(e);
      }
    }
    getProduct();
  }, [])

  useEffect(() => {
    store?.filter((val) => {
      return (val.id === user?.uid)
    }).map((curr, _) => {
      dispatch(setCurrentStore(curr));
    })
  }, [store]);

  function LoadingScreen() {
    return (
      <Box sx={{ backgroundColor: "#f2f2eb", height: "100vh", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Stack sx={{ alignItems: "center", justifyContent: "space-between" }}>
          <Typography variant='h2' sx={{ fontSize: "40px", color: "secondary.light" }}>Mero Bazar</Typography>
          <Stack sx={{ alignItems: "center", position: 'absolute', bottom: "40px", gap: "5px" }}>
            <BarLoader width={"100%"} height={"2px"} color="#2c608a" />
            <Typography variant='h4' sx={{ fontSize: "16px", color: "secondary.light" }}>from</Typography>
            <Typography variant='h4' sx={{ fontSize: "16px", color: "secondary.light" }}>Pajwol Neupane</Typography>
          </Stack>
        </Stack>
      </Box>
    )
  }

  return (
    <>
      {
        loading === true ? <LoadingScreen /> : <Routes>
          <Route path="/"
            element={<>
              <NavBar />
              <HomeSlider />
              <HomePage />
              <Footer />
            </>} />
          <Route path="/login" element={
            <>
              {
                user === null ? <Login /> : <Navigate to="/" />
              }
            </>
          } />
          <Route path="/category/:title"
            element={<>
              <NavBar />
              <CategoryWrapper />
              <Footer />
            </>} />
          <Route path="/product/:id"
            element={<>
              <NavBar />
              <ProductPage />
              <Footer />
            </>} />
          <Route path="/store/:name"
            element={<>
              <NavBar />
              <StorePage />
              <Footer />
            </>} />
          <Route path="/cart"
            element={<>
              <ProtectiveRoute com={<CartPage />} />
            </>} />
          <Route path="/payment"
            element={<>
              <ProtectiveRoute com={<BuyPage />} />
            </>} />
          <Route path="/orders"
            element={<>
              <ProtectiveRoute com={<OrderPage />} />
            </>} />
          <Route path="/seller/account" element={
            <>
              {
                user === null ? <SellerLogin /> : <Navigate to="/" />
              }
            </>
          } />
        </Routes>
      }
    </>
  );
}

export default App;
