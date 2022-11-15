import { createTheme } from "@mui/material";

const font = "'Poppins', sans-serif";
const theme = createTheme({
    palette:{
        primary:{
        main: "#f2f2eb",
        light: "#f5f5f0"
        },
        secondary:{
        main:"#234e70",
        light:"#2c608a",
        },
        text:{
          main:"#1b1c1f",
          light:"#35363b"
        },
        otherColor:{
        main:"#faf8bf",
        light:"#fffdd1"
        }
    },
    overrides:{
      MuiSlider: {
        thumb:{
        color: "yellow",
        },
        track: {
          color: 'red'
        },
        rail: {
          color: 'black'
        }
      }
  },
      typography:{
        fontFamily:font,
        h1:{fontWeight:700,fontSize:"25px",overflow:"hidden"},
        h2:{fontWeight:600,fontSize:"23px",overflow:"hidden"},
        h3:{fontWeight:500,fontSize:"21px",overflow:"hidden"},
        h4:{fontWeight:400,fontSize:"19px",overflow:"hidden"},
        h5:{fontWeight:300,fontSize:"18px",overflow:"hidden"},
        h6:{fontWeight:200,fontSize:"17px",overflow:"hidden"},
        p:{fontWeight:100,fontSize:"16px",overflow:"hidden"}
      },
        
});
export default theme;