import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    shipping:{
        address: {type: String},
        city: {type: String},
        postalCode: {type: String},
        country: {type: String},
    }
},{
    timestamps: true,
});

const User = mongoose.model('Users', userSchema);

export default User;
