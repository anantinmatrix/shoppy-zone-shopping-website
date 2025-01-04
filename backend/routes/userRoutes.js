import express from "express";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { JWT_KEY } from "../config/config.js";
import User from "../models/userModel.js";
import { authProtector } from "../middlewares/authProtector.js";
import Order from "../models/orderModel.js";
import product from "../models/productModel.js";

const userRouter = express.Router();

// creating a new user
userRouter.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json("please fill all the necessary fields");
  }
  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    return res.status(400).send("User already exists");
  }

  const newUser = new User({
    name: name,
    email: email,
    password: password,
  });
  newUser.save();
  res.json(newUser);
});

// logging in a user
userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("please fill all the necessary fields");
    }
    const user = await User.findOne({ email: email, password: password });
    if (!user) {
      return res.status(400).send("Invalid email or password");
    }
    user.password = undefined;
    const token = jwt.sign({ userId: user.id }, JWT_KEY, { expiresIn: "30d" });
    res.status(200).json({ user: user, token: token });
  } catch (err) {
    res.status(500).send(err);
  }
});

userRouter.get("/getuser",authProtector, async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findOne({ _id: userId });
    user.password = undefined;
    res.status(200).json({ user: user });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});


userRouter.post("/createorder", authProtector, async (req, res) => {
  try {
    const userId = req.user._id;
    const { products, name, address, city, postaCode, country, totalAmount } =
      req.body;

    const newOrder = new Order({
      shipping: {
        name: name,
        address: address,
        city: city,
        postalCode: postaCode,
        country: country,
      },
      payment: {
        method: "payPal",
        totalAmount: totalAmount,
      },
      items: products,
    });
    newOrder.save();
    res.json({ order: newOrder });
  } catch (err) {
    res.status(500).json({ message: "error creating order" });
  }
});

userRouter.put("/updateuser",authProtector, async (req, res) => {
  try {
    const userId = req.user._id;
    const {name, address,city, postalCode, country} = req.body;
    const user = await User.findOne({'_id': userId})
    user.name = name;
    user.shipping.address = address;
    user.shipping.city = city;
    user.shipping.postalCode = postalCode;
    user.shipping.country = country;
    await user.save()
    res.status(200).json({message: 'User updated successfully', user: user})
  } catch (err) {
    res.status(500).json({ message: "error updating user" });
  }
});

export default userRouter;
