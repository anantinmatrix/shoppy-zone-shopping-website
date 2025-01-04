import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products',
        required: true,
    },
    rating:{
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    comment: {
        type: String
    }
},{
    timestamps: true
})

const Review = mongoose.model('Reviews', reviewSchema);
export default Review;