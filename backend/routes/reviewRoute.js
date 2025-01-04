import express from "express";
import { authProtector } from "../middlewares/authProtector.js";
import Review from "../models/reviewModel.js";
import product from "../models/productModel.js";

const reviewRouter = express.Router();

reviewRouter.post("/addreview/:productId", authProtector, async (req, res) => {
  try {
    const { productId } = req.params;
    const total = 0;
    const { rating, comment } = req.body;
    const existingReview = await Review.findOne({
      user: req.user,
      product: { _id: productId },
    });
    if (existingReview) {
      return res
        .status(400)
        .json({ message: "you have already reviewed this product" });
    }
    const newReview = new Review({
      user: req.user,
      product: productId,
      rating: rating,
      comment: comment,
    });
    newReview.user.password = undefined;
    newReview.save();
    const seedReview = await product.findOne({ _id: productId });
    seedReview.reviews.push(newReview);
    seedReview.save();
    res.status(200).json({ review: newReview, product: seedReview });
  } catch (err) {
    res.status(500).send(err);
  }
});

export default reviewRouter;
