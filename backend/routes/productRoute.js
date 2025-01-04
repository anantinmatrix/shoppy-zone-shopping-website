import express, { request } from "express";
import product from "../models/productModel.js";
import { authProtector } from "../middlewares/authProtector.js";
const productRouter = express.Router();
import multer from "multer";
import upload from "../middlewares/fileUpload.js";
import Review from "../models/reviewModel.js";

productRouter.post("/createproduct", authProtector, upload.single("image"), async (req, res) => {
    try {
      const { name, description, price, category, brand } = req.body;
      const image = req.file;
      if (!name || !price || !description || !category || !brand || !image) {
        return res.json({ message: "please fill all the necessary fields" });
      }
      console.log(req.file);
      const newProduct = new product({
        author: req.user._id,
        name: name,
        price: price,
        description: description,
        category: category,
        brand: brand,
        image: `/uploads/${req.file.filename}`,
      });
      newProduct.save();
      res.json({
        product: newProduct,
        image: req.file ? req.file.filename : null,
      });
    } catch (err) {
      res.json({ message: "error creating product", error: err });
    }
  }
);

productRouter.get("/allproducts", async (req, res) => {
  const allProducts = await product.find({});
  res.json(allProducts);
});

productRouter.get("/singleproduct/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const getProduct = await product.findOne({ _id: id });
    let total = 0;
    const reviewCount = getProduct.reviews.length;
    const review = await Review.find({ product: { _id: id } });
    console.log(review);
    for (let i = 0; i < review.length; i++) {
      total += review[i].rating;
    }
    getProduct.averageRating = total / reviewCount;

    res.json({ product: getProduct });
  } catch (err) {
    res.json({ message: "error fetching product", error: err });
  }
});

productRouter.get("/productreview/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const getReviews = await Review.find({ product: { _id: productId } });

    res.status(200).json({ reviews: getReviews });
  } catch (err) {
    res.status(400).json({ message: `Couldn't fetch reviews` });
  }
});

productRouter.get("/userproducts", authProtector, async (req, res) => {
  try {
    const userProducts = await product.find({ author: req.user._id });
    console.log(userProducts);
    res.status(200).json({ products: userProducts });
  } catch (err) {
    res.status(400).json({ message: `Couldn't fetch products by user` });
  }
});



export default productRouter;
