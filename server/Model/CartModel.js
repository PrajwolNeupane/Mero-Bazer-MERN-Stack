import mongoose from "mongoose";


const CartSchema = new mongoose.Schema({
    owner:{
        type:String
    },
    item:[]
})



const Cart = mongoose.models.CartSchema || mongoose.model('Cart', CartSchema);
export default Cart;

