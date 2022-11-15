import { Typography, Box, Stack, Button, Snackbar } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Components/style.css'
import StarIcon from '@mui/icons-material/Star';
import { CategoriesData } from '../Components/data';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StoreSlider from '../Components/StoreSlider';
import CategorySlider from '../Components/CategorySlider';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { addCart } from '../State Management/Features/Cart/cartSlice.js';
import '../Components/style.css'


export default function HomePage() {

  const dispatch = useDispatch();


  const Navigate = useNavigate();
  const [value, setValue] = useState(10000);
  const { user } = useSelector((state) => state.User);
  const { token } = useSelector((state) => state.Token);
  const { store } = useSelector((state) => state.Store);
  const { products } = useSelector((state) => state.Product);
  const [openSnack, setSnack] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  const addToCart = async (item) => {
    try {
      const res = await axios.post("/cart/add", {
        owner: token,
        item: item
      });
      setSnack(true);
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
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <>
      <CategorySlider data={CategoriesData} />
      <Box sx={{ margin: { md: "20px 4% 0px 4%", xs: "10px 1% 0px 1%" }, padding: "10px 1%", backgroundColor: "#f2f2eb", display: "flex", flexDirection: "column", gap: "10px" }}>
        <Stack sx={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <Typography variant='h2' sx={{ color: "text.main", fontSize: { md: "22px", sm: "20px", xs: "17px" } }}>Products</Typography>
          <Stack sx={{ flexDirection: "row", alignItems: "center", gap: "10px", display: { md: "flex", xs: "none" } }}>
            <Typography variant='h3' sx={{ color: "text.main", fontSize: { md: "16px", sm: "14px", xs: "12px" } }}>Price :</Typography>
            <Typography variant='h4' sx={{ color: "text.main", fontSize: { md: "16px", sm: "14px", xs: "12px" } }}>{1000}</Typography>
            <input type={"range"} min={1000} max={10000} style={{ width: "300px", height: "5px" }} onChange={(e) => {
              setValue(e.target.value);
            }} value={value} />
            <Typography variant='h4' sx={{ color: "text.main", fontSize: { md: "16px", sm: "14px", xs: "12px" } }}>{value}</Typography>
          </Stack>
        </Stack>
        <div className='grid-box'>
          {
            products?.filter((val) => {
              if (value === 10000) {
                return val;
              } else {
                var temp_data = val.price;
                return (value >= temp_data);
              }
            }).map((curr, indx) => (
              <Stack sx={{ gap: { md: "5px", xs: "2px" }, alignItems: "flex-start", backgroundColor: "white", padding: "10px", width: "90%", cursor: "pointer" }} key={indx}>
                <img src={curr?.image} alt={curr.title} className={"category-slider-img"} onClick={() => {
                  Navigate("/product/" + curr?._id);
                }} />
                <Typography variant='h3' sx={{ color: "text.main", fontSize: { md: "18px", sm: "16px", xs: "14px" } }}>
                  {curr?.name}
                </Typography>
                <Typography variant='h4' sx={{ color: "text.main", fontSize: { md: "16px", sm: "15px", xs: "13px" } }}>
                  Rs {curr?.price}
                </Typography>
                <Stack sx={{ flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between", width: "90%" }}>
                  <Stack sx={{ flexDirection: "row", alignItems: "center", gap: "0px" }}>
                    {
                      Math.round(curr?.rate * 2) % 2 === 0 ? <>
                        {
                          Array(Math.round(curr?.rate * 2) / 2).fill().map((_, indx) => (
                            <StarIcon sx={{ fontSize: { md: "20px", xs: "16px" }, color: "#FFD700" }} key={indx} />
                          ))
                        }
                      </> : <>
                        {
                          Array(Math.round(curr?.rate * 2 - 1) / 2).fill().map((_, indx) => (
                            <StarIcon sx={{ fontSize: { md: "20px", xs: "16px" }, color: "#FFD700" }} key={indx} />
                          ))
                        }
                        <StarHalfIcon sx={{ fontSize: { md: "20px", xs: "16px" }, color: "#FFD700" }} />
                      </>
                    }

                  </Stack>
                  <Typography variant='h5' sx={{ color: "text.main", fontSize: { md: "14px", xs: "12px" } }}>{curr?.rate}</Typography>
                </Stack>
                <Button sx={{
                  width: "90%",
                  padding: "2px 0px",
                  color: "otherColor.main",
                  backgroundColor: "secondary.light", "&:hover": {
                    backgroundColor: "secondary.main"
                  },
                  borderRadius: "0px",
                }}
                  onClick={
                    () => {
                      if (user === null) {
                        Navigate("/login");
                      } else {
                        addToCart(curr);
                      }
                    }
                  }>
                  Add to Cart
                </Button>
              </Stack>
            ))
          }
        </div>
      </Box>
      <Snackbar
        open={openSnack}
        autoHideDuration={2000}
        onClose={()=>{
          setSnack(false);
        }}
        message="Added to Cart"
      />
      <StoreSlider data={store} />
    </>
  )
}
