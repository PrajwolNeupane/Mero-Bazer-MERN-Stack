import mongoose from "mongoose";


const OrderSchema = new mongoose.Schema({
    
    address:{
        type:String
    },
    number:{
        type:String
    },
    price:{
        type:Number
    },
    date:{
        type:String
    },
    cash:{
        type:String
    },
    product:[],
    owner:{
        type:String
    }

})



const Order = mongoose.models.OrderSchema || mongoose.model('Order', OrderSchema);
export default Order;

