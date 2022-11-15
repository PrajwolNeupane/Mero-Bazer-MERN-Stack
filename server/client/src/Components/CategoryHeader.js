import { Box, Typography } from '@mui/material'
import React from 'react'

export default function CategoryHeader({data}) {
  return (
    <Box sx={{
        width: "100%", height: {md:"300px",sm:"250px",xs:"200px"}, background: `linear-gradient(to Top,rgb(35, 78, 112,1), rgb(44, 96, 138,0.7)) ,url(${data?.bg})`, display: "flex"
        , justifyContent: "center", alignItems: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundAttachment: "fixed",
        backgroundPosition: "top",flexDirection:"column",gap:{md:"10px",sm:"8px",xs:"5px"}
      }}>
        <Typography variant='h2' sx={{fontSize:{md:"50px",sm:"35px",xs:"20px"},color:"white"}}>{data?.title}</Typography>
        <Typography variant='h6' sx={{fontSize:{md:"20px",sm:"17px",xs:"14px"},lineHeight:{md:"22px",sm:"19px",xs:"16px"},color:"white",letterSpacing: "5px",textAlign:"center" }}>{data?.quote}</Typography>
        <Box sx={{width:{md:"50%",sm:"70%",xs:"90%"},height:"1px",backgroundColor:"white"}}></Box>
        <Typography variant='h6' sx={{fontSize:{md:"20px",sm:"17px",xs:"14px"},lineHeight:{md:"22px",sm:"19px",xs:"16px"},color:"white",letterSpacing: "2px" ,textAlign:"center"}}>We offer different kinds of items from different brands.</Typography>
    </Box>
  )
}
