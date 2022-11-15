import { Box, Stack, Typography, InputBase, Button, Snackbar } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarIcon from '@mui/icons-material/Star';
import '../Components/style.css';
import { useNavigate } from 'react-router-dom';
import StoreSlider from './StoreSlider';
import { useSelector, useDispatch } from 'react-redux';
import './style.css';
import axios from 'axios';
import { addCart } from '../State Management/Features/Cart/cartSlice';

export default function CategoryBody({ title }) {


  const dispatch = useDispatch();
  const [value, setValue] = useState(10000);
  const [search, setSearch] = useState("");
  const Navigate = useNavigate();
  const { store } = useSelector((state) => state.Store);
  const { products } = useSelector((state) => state.Product);
  const { token } = useSelector((state) => state.Token);
  const [openSnack, setSnack] = useState(false);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: false,
    draggable: true,
    arrows: true,
    prevArrow: <ArrowBackIosNewIcon sx={{ backgroundColor: "#234e70", fontSize: "20px", clipPath: "circle(50% at 50% 50%)", color: "white", padding: "2px" }} className="icon" />,
    nextArrow: <ArrowForwardIosIcon sx={{ backgroundColor: "#234e70", fontSize: "20px", clipPath: "circle(50% at 50% 50%)", color: "white", padding: "2px" }} className="icon" />
  };

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


  function SingleItem({ curr }) {
    return (
      <Stack sx={{ gap: "5px", alignItems: "flex-start", backgroundColor: "white", padding: "10px", width: "90%", cursor: "pointer" }}

      >
        <img src={curr?.image} alt={curr?.name} className={"category-slider-img"} onClick={() => {
          Navigate("/product/" + curr?._id);
        }} />
        <Typography variant='h3' sx={{ color: "text.main", fontSize: { md: "18px", sm: "16px", xs: "14px" } }}>
          {curr?.name}
        </Typography>
        <Typography variant='h4' sx={{ color: "text.main", fontSize: { md: "16px", sm: "15px", xs: "13px" } }}>
          Rs {curr.price}
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
          width: "100%",
          padding: "2px 0px",
          color: "secondary.main",
          backgroundColor: "otherColor.light", "&:hover": {
            backgroundColor: "otherColor.main"
          },
          borderRadius: "0px",
        }} onClick={() => {
          addToCart(curr);
        }}>
          Add to Cart
        </Button>
      </Stack>
    )
  }


  return (
    <>
      <Box sx={{ margin: "20px 4% 0px 4%", padding: "10px 1%", backgroundColor: "#f2f2eb", display: "flex", flexDirection: "column", gap: "20px" }}>
        <Stack sx={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <Typography variant='h2' sx={{ color: "text.main", fontSize: { md: "25px", sm: "20px", xs: "16px" } }}>Products Avaiable</Typography>
          <Box sx={{ width: "40%", backgroundColor: "white", padding: "2px 2%", display: { md: "flex", sm: "flex", xs: "none" }, alignItems: "center", gap: "1%" }}>
            <InputBase placeholder='Search Product' fullWidth onChange={(e) => {
              setSearch(e.target.value);
            }} />
            <SearchIcon sx={{ fontSize: "25px" }} />
          </Box>
          <Stack sx={{ flexDirection: "row", alignItems: "center", display: { md: "flex", xs: "none" } }}>
            <Typography variant='h4' sx={{ color: "text.main", fontSize: "16px", display: { md: "block", xs: "none" } }}>{1000}</Typography>
            <input type={"range"} min={1000} max={10000} style={{ width: "300px", height: "5px" }} onChange={(e) => {
              setValue(e.target.value);
            }} value={value} />
            <Typography variant='h4' sx={{ color: "text.main", fontSize: "16px", display: { md: "block", xs: "none" } }}>{value}</Typography>
          </Stack>
        </Stack>
        <div className='grid-box'>
          {
            products?.filter((val) => {
              return (val.type.toLowerCase().replace(/\s/g, '').includes(title));
            })
              .filter((val) => {
                if (search === "") {
                  return val;
                } else if (val?.name.toLowerCase().includes(search.toLowerCase())) {
                  return val;
                } else {
                  return [];
                }
              }).filter((val) => {
                if (value === 10000) {
                  return val;
                } else {
                  var temp_data = val.price * 100;
                  return (value >= temp_data);
                }
              }).map((curr, indx) => (
                <SingleItem curr={curr} key={indx} />
              ))
          }
        </div>
      </Box>
      <Snackbar
        open={openSnack}
        autoHideDuration={2000}
        onClose={() => {
          setSnack(false);
        }}
        message="Added to Cart"
      />
      <StoreSlider data={store} />
    </>
  )
}
