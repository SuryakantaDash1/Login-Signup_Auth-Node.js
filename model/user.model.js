import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "please provide username"],
        unique: [true, "Username exist"]
    },
    password: {
        type: String,
        required: [true, "please provide a password"],
        unique: false,
    },
    email: {
        type: String,
        required: [true, "please provide a email"],
        unique: true,
    },
    firstName: { 
        type: String, 
        
    },
    lastName: { 
        type: String, 
       
    },
    mobile: {
        type: Number,
        unique: true
    },
    profile: {
        type: String
    },
    gender: {
        type: String
    },
    addresses: [{
        addressLine: { type: String },
        city: { type: String },
        state: { type: String },
        pincode: { type: String },
        lat: { type: Number },
        lang: { type: Number }
        
    }]
},
{ timestamps: true },

);

export default mongoose.model('User', userSchema);

