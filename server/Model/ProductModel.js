import mongoose from "mongoose";


const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    }, type: {
        type: String,
    },
    image: {
        type: String,
    },
    rate:{
        type:Number
    },
    price:{
        type:Number
    },
    storeId:{
        type:String
    }
})



const Product = mongoose.models.ProductSchema || mongoose.model('Product', ProductSchema);
export default Product;

