import { Stack, Typography, Box } from '@mui/material';
import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from "react-slick";
import { useNavigate } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import './style.css'

export default function SimilaryProduct({ data }) {


    const Navigate = useNavigate();

    const responsive = [
        {
            breakpoint: 1000,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
                infinite: true,
            }
        },
        {
            breakpoint: 900,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
            }
        }
    ]

    function SlideItem({ img, title, id }) {
        return (
            <Stack sx={{ justifyContent:"space-between", alignItems: "center", backgroundColor: "white", padding: "10px", width: "200px", height: "250px", cursor: "pointer" }} onClick={() => {
                Navigate("/product/" + id, { replace: true });
            }}>
                <img src={img} alt={title} className={"category-slider-img"} />
                <Typography variant='h4' sx={{ color: "text.main",  fontSize: {md:"16px",sm:"14px",xs:"12px"}}}>
                    {title}
                </Typography>
            </Stack>
        )
    }

    return (
        <Box sx={{ margin: {md:"20px 4% 0px 4%",xs:"10px 1% 0px 1%"}, padding: "10px 1%", backgroundColor: "#f2f2eb", display: "flex", flexDirection: "column", gap: "10px" }}>
            <Typography variant='h2' sx={{ color: "text.main", fontSize: {md:"22px",sm:"20px",xs:"17px"} }}>Similar Product</Typography>
            <Slider style={{ overflow: "hidden" }} infinite={true} speed={500} slidesToShow={5} slidesToScroll={1}
                prevArrow={<ArrowBackIosNewIcon sx={{ backgroundColor: "#234e70", fontSize: "20px", clipPath: "circle(50% at 50% 50%)", color: "white", padding: "2px" }} className="icon" />} nextArrow={<ArrowForwardIosIcon sx={{ backgroundColor: "#234e70", fontSize: "20px", clipPath: "circle(50% at 50% 50%)", color: "white", padding: "2px" }} className="icon" />} autoplay={false} draggable={true} arrows={true}
                responsive={responsive}>
                {
                    data?.map((curr, indx) => (
                        <SlideItem key={indx} img={curr?.image} title={curr?.name} id={curr?._id} />
                    ))
                }
            </Slider>
        </Box>
    )
}
