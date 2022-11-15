import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    }, address: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: Number
    },
    image: {
        type: String
    },
    password: {
        type: String
    },
    isAdmin:{
        type:Boolean
    }
})



const User = mongoose.models.UserSchema || mongoose.model('User', UserSchema);
export default User;

