import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { MONGO_URL } from './config/config.js';
import userRouter from './routes/userRoutes.js';
import productRouter from './routes/productRoute.js';
import reviewRouter from './routes/reviewRoute.js';
import product from './models/productModel.js';
import { sampleProducts } from './config/sampleProducts.js';
import orderRouter from './routes/orderRoute.js';

// creating variables here
const app = express();
const PORT = 5000;

// implementing middlewares
app.use(cors())
app.use(express.json())
app.use('/uploads', express.static('uploads'));


// connecting to mongoose database
mongoose.connect(MONGO_URL)
mongoose.connection.on('connected',()=>{
    console.log('connected to mongodb')
})
mongoose.connection.on('error',()=>{
    console.log('error connecting to mongodb')
})

// Function to add sample products to the database
const seedProducts = async()=>{
    try{

        await product.deleteMany()
        console.log(`Deleted existing sample products`)
        // comment this delete product line after starting the server
        sampleProducts.map((products)=>{
            const newSampleProduct = new product({
                name: products.name,
                price: products.price,
                description: products.description,
                category: products.category,
                brand: products.brand,
                image: products.image
            })
            newSampleProduct.save()
        })

        console.log(`Added sample products`)
    }
    catch(err){
        console.log(err)
    }
}
seedProducts()

//defining routes here
app.use('/users',userRouter)
app.use('/products', productRouter)
app.use('/reviews', reviewRouter)
app.use('/orders', orderRouter)


// starting the server
app.listen(PORT,()=>{
    console.log('listening on port')
})