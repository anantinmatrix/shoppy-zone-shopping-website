import mongoose, { mongo } from 'mongoose'

const productSchema = new mongoose.Schema({
    author: {
        type : mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type : Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    image: {
        type: String,
        // required: true
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'reviews'
    }],
    averageRating: {
        type: Number,
        default: 0
    }
},
{
    timestamps: true
})

const product = new mongoose.model('Products', productSchema)
export default product;