import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Stack, Typography, Button, Modal, InputBase, MenuItem, TextField } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import '../Components/style.css'
import StoreSlider from '../Components/StoreSlider';
import axios from 'axios';
import { addProducts } from '../State Management/Features/Product/productSlice';
import { addUser } from '../State Management/Features/User/userSlice';

export default function StorePage() {

  const { name } = useParams();
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const { store } = useSelector((state) => state.Store);
  const { user } = useSelector((state) => state.User);
  const [storeData, setStoreData] = useState({});
  const [openModal, setModal] = useState(false);
  const [nextStore, setNextStore] = useState([]);
  const [addModal, setAddModal] = useState(false);

  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImage, setProductImage] = useState(null);


  const { products } = useSelector((state) => state.Product);
  const { token } = useSelector((state) => state.Token);



  const categoryTypeOptions = [
    {
      value: 'Electonics & Gadgets',
      label: "Electonics & Gadgets"
    },
    {
      value: 'Home Appliances',
      label: 'Home Appliances',
    },
    {
      value: 'Clothing & Fashion ',
      label: 'Clothing & Fashion ',
    },
    {
      value: 'Instrument ',
      label: 'Instrument ',
    }, {
      value: 'Clothing & Fashion',
      label: "Clothing & Fashion"
    },
    {
      value: 'Instrument ',
      label: 'Instrument ',
    },
    {
      value: 'Pets',
      label: 'Pets',
    },
    {
      value: 'Groceries',
      label: 'Groceries',
    },
    {
      value: 'Health & Beauty',
      label: 'Health & Beauty',
    },
    {
      value: 'Furniture',
      label: 'Furniture',
    },
    {
      value: 'Others',
      label: 'Others',
    }
  ];

  const [categoryType, setCategoryType] = useState('Electonics & Gadgets');

  const handleChange = (e) => {
    setCategoryType(e.target.value);
  };


  const [newName, setNewName] = useState(user?.name);
  const [newAddress, setNewAddress] = useState(user?.address);
  const [newPhone, setNewPhone] = useState(user?.phone);
  const [newDescription, setNewDescription] = useState(user?.description);
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);


  useEffect(() => {
    store.filter((val) => {
      return (val._id.includes(name))
    }).map((curr, _) => {
      setStoreData(curr);
    })
  }, [store, name]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [store, name, nextStore]);

  useEffect(() => {
    setNextStore([]);
    store.filter((val) => {
      return (!val._id.includes(name))
    }).map((curr, _) => {
      setNextStore(old => [...old, curr]);
    })
  }, [name, store]);

  const update = async () => {

    setError(null)

    try {
      if (!newName) {
        setError("Enter Shop Name");
      }
      else if (!newAddress) {
        setError("Enter Shop Address");
      }
      else if (!newPhone) {
        setError("Enter Shop Phone Number");
      }
      else if (!newDescription) {
        setError("Enter Shop Description");
      }
      else if (!image) {
        const res = await axios.post("/user/update/", {
          name: newName,
          phone: newPhone,
          address: newAddress,
          description: newDescription,
          id:user._id
        });
        async function getUserInfo() {
          return axios.post("/user/me", { token: token });
        }
        const { data } = await getUserInfo();
        dispatch(addUser(data));
      } else {
        const res = await axios.post("/user/update/", {
          name: newName,
          phone: newPhone,
          address: newAddress,
          description: newDescription,
          image: image,
          id:user._id
        }, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
        async function getUserInfo() {
          return axios.post("/user/me", { token: token });
        }
        const { data } = await getUserInfo();
        dispatch(addUser(data));
      }
    } catch (e) {
      console.log(e);
    }

  }
  const upload = async () => {

    try {
      const res = await axios.post("/product/", {
        name: productName,
        description: productDescription,
        image: productImage,
        price: Number(productPrice),
        storeId: user?._id,
        type: categoryType,
        rate: Math.floor(Math.random() * (5 - 1 + 1) + 1)
      }, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      try {
        const res = await axios.get("/product/");
        dispatch(addProducts(res.data));

      } catch (e) {
        console.log(e);
      }


    } catch (e) {
      console.log(e);
    }
  }



  return (
    <>
      <Box sx={{ margin: { md: "20px 4% 0px 4%", sm: "15px 2% 0px 2%", xs: "10px 1% 0px 1%" }, padding: "10px 1%", backgroundColor: "#f2f2eb", display: "flex", flexDirection: "column", gap: "20px" }}>
        <Stack sx={{ flexDirection: { md: "row", sm: "row", xs: "column" }, alignItems: "flex-start", gap: "50px", margin: "20px" }}>
          <img src={storeData?.image} style={{ width: "300px", height: "300px", objectFit: "contain" }} />
          <Stack sx={{ gap: "5px" }}>
            <Typography variant='h3' sx={{ color: "text.main", fontSize: "30px" }}>
              {storeData?.name}
            </Typography>
            <Stack sx={{ flexDirection: "row", alignItems: "center", gap: "5px" }}>
              <EmailIcon sx={{ fontSize: "22px", color: "text.light" }} />
              <Typography variant='h4' sx={{ color: "text.light", fontSize: "18px" }}>
                {storeData?.email}
              </Typography>
            </Stack>
            <Stack sx={{ flexDirection: "row", alignItems: "center", gap: "5px" }}>
              <LocationOnIcon sx={{ fontSize: "25px", color: "text.light" }} />
              <Typography variant='h4' sx={{ color: "text.light", fontSize: "18px" }}>
                {storeData?.address}
              </Typography>
            </Stack>
            <Stack sx={{ flexDirection: "row", alignItems: "center", gap: "5px" }}>
              <LocalPhoneIcon sx={{ fontSize: "25px", color: "text.light" }} />
              <Typography variant='h4' sx={{ color: "text.light", fontSize: "18px" }}>
                {storeData?.phone}
              </Typography>
            </Stack>
            {
              user === null ? <></> : <>{
                user?._id.includes(name) ? <Button sx={{
                  width: "200px",
                  color: "white",
                  backgroundColor: "secondary.light", "&:hover": {
                    backgroundColor: "secondary.main"
                  },
                  borderRadius: "0px",
                }} onClick={() => {
                  setModal(true);
                }}>
                  Update Store Profile
                </Button> : <></>
              }</>
            }
            <Typography>
              {storeData?.description}
            </Typography>
          </Stack>
        </Stack>
        <Stack sx={{ flexDirection: "row", gap: "50px" }}>
          <Typography variant='h3' sx={{ color: "text.main", fontSize: { md: "25px", sm: "23px", xs: "20px" } }}>
            Product
          </Typography>
          {
            user?._id.includes(name) ? <Button sx={{
              padding: "4px 10px",
              color: "white",
              backgroundColor: "secondary.light", "&:hover": {
                backgroundColor: "secondary.main"
              },
              borderRadius: "0px",
            }} onClick={() => {
              setAddModal(true);
            }}>
              Add a new Product
            </Button> : <></>
          }
        </Stack>
        <Box sx={{ width: "100%", height: "1px", backgroundColor: "#35363b" }}></Box>
        <div className='grid-box'>
          {
            products?.filter((val) => {
              return (
                val.storeId.includes(name)
              );
            })
              .map((curr, indx) => (
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
                </Stack>
              ))
          }
        </div>
      </Box>
      <Box sx={{ margin: "20px 4% 0px 4%", padding: "10px 1%", backgroundColor: "#f2f2eb", display: "flex", flexDirection: "column", gap: "10px" }}>
        <StoreSlider data={nextStore} />
      </Box>
      <Modal
        open={openModal}
        onClose={() => {
          setModal(false);
          setError(null);
          setImage(null);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
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
          gap: "10px"
        }}>
          <Typography variant='h3' sx={{ color: "text.main", fontSize: "25px" }}>
            Update store Profile
          </Typography>
          <Stack sx={{ gap: "5px", backgroundColor: "transparent" }}>
            <Typography variant='h5' sx={{ color: "text.main", fontSize: "14px" }}>Store Name</Typography>
            <Box sx={{ backgroundColor: "white", padding: "1px 3px" }}>
              <InputBase placeholder='Name' type='text' sx={{ fontWeight: 400 }} fullWidth defaultValue={user?.name} onChange={(e) => {
                setNewName(e.target.value);
              }} />
            </Box>
            {
              error === "Enter Shop Name" ? <Typography sx={{ fontSize: "12px", color: "red" }}>{error}</Typography> : <></>
            }
          </Stack>
          <Stack sx={{ gap: "5px" }}>
            <Typography variant='h5' sx={{ color: "text.main", fontSize: "14px" }}>Store Address</Typography>
            <Box sx={{ backgroundColor: "white", padding: "1px 3px" }}>
              <InputBase placeholder='Address' type='text' sx={{ fontWeight: 400 }} fullWidth defaultValue={user?.address} onChange={(e) => {
                setNewAddress(e.target.value);
              }} />
              {
                error === "Enter Shop Address" ? <Typography sx={{ fontSize: "12px", color: "red" }}>{error}</Typography> : <></>
              }
            </Box>
          </Stack>
          <Stack sx={{ gap: "5px" }}>
            <Typography variant='h5' sx={{ color: "text.main", fontSize: "14px" }}>Store Phone</Typography>
            <Box sx={{ backgroundColor: "white", padding: "1px 3px" }}>
              <InputBase placeholder='Phone' type='text' sx={{ fontWeight: 400 }} fullWidth defaultValue={user?.phone} onChange={(e) => {
                setNewPhone(e.target.value);
              }} />
            </Box>
            {
              error === "Enter Shop Phone Number" ? <Typography sx={{ fontSize: "12px", color: "red" }}>{error}</Typography> : <></>
            }
          </Stack>
          <Stack sx={{ gap: "5px" }}>
            <Typography variant='h5' sx={{ color: "text.main", fontSize: "14px" }}>Store Description</Typography>
            <textarea placeholder='Description' style={{ resize: "none", height: "100px", padding: "0px 2px", border: "none", outline: "none" }} defaultValue={user?.description} onChange={(e) => {
              setNewDescription(e.target.value);
            }} />
            {
              error === "Enter Shop Description" ? <Typography sx={{ fontSize: "12px", color: "red" }}>{error}</Typography> : <></>
            }
          </Stack>
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
            Add a photo
          </Button>
          {
            image === null ? <img src={user?.image} style={{ width: "100px", height: "100px", objectFit: "cover", margin: "0px auto" }} /> : <img src={URL.createObjectURL(image)} style={{ width: "100px", height: "100px", objectFit: "cover", margin: "0px auto" }} />
          }
          <Button sx={{
            width: "100%",
            padding: "2px 0px",
            color: "white",
            backgroundColor: "secondary.light", "&:hover": {
              backgroundColor: "secondary.main"
            },
            borderRadius: "0px",
          }} onClick={() => {
            update();
          }}>
            Update
          </Button>
        </Box>
      </Modal>
      <Modal
        open={addModal}
        onClose={() => {
          setAddModal(false);
          setProductImage(null)
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
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
          gap: "10px"
        }}>
          <Typography variant='h3' sx={{ color: "text.main", fontSize: "25px" }}>
            Add a new Product
          </Typography>
          <Stack sx={{ gap: "5px" }}>
            <Typography variant='h5' sx={{ color: "text.main", fontSize: "14px" }}>Product Name</Typography>
            <Box sx={{ backgroundColor: "white", padding: "1px 3px" }}>
              <InputBase placeholder='Name' type='text' sx={{ fontWeight: 400 }} fullWidth onChange={(e) => {
                setProductName(e.target.value);
              }} />
            </Box>
          </Stack>
          <Stack sx={{ gap: "5px" }}>
            <Typography variant='h5' sx={{ color: "text.main", fontSize: "14px" }}>Price</Typography>
            <Box sx={{ backgroundColor: "white", padding: "1px 3px" }}>
              <InputBase placeholder='Price' type='text' sx={{ fontWeight: 400 }} fullWidth onChange={(e) => {
                setProductPrice(e.target.value);
              }} />
            </Box>
          </Stack>
          <Stack sx={{ gap: "5px" }}>
            <Typography variant='h5' sx={{ color: "text.main", fontSize: "14px" }}>Product Type</Typography>
            <TextField
              select
              value={categoryType}
              onChange={handleChange}
              sx={{ backgroundColor: "white" }}
            >
              {categoryTypeOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
          <Stack sx={{ gap: "5px" }}>
            <Typography variant='h5' sx={{ color: "text.main", fontSize: "14px" }}>Product Description</Typography>
            <textarea placeholder='Description' style={{ resize: "none", height: "100px", padding: "0px 2px", border: "none", outline: "none" }} onChange={(e) => {
              setProductDescription(e.target.value);
            }} />
          </Stack>
          <input type={"file"} id="btn-2" style={{ display: "none" }} name="image" onChange={(e) => {
            if (e.target.files[0]) {
              setProductImage(e.target.files[0]);
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
            document.getElementById('btn-2').click();
          }}>
            Add a product photo
          </Button>
          {
            productImage === null ? <></> : <img src={URL.createObjectURL(productImage)} style={{ width: "150px", height: "150px", objectFit: "cover", margin: "0px auto" }} />
          }
          <Button sx={{
            width: "100%",
            padding: "2px 0px",
            color: "white",
            backgroundColor: "secondary.light", "&:hover": {
              backgroundColor: "secondary.main"
            },
            borderRadius: "0px",
          }} onClick={() => {
            upload();
          }}>
            Add a Product
          </Button>
        </Box>
      </Modal>
    </>
  )
}
