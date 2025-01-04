import mongoose from "mongoose";

const orderModel = new mongoose.Schema({
  shipping: {
    name: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  payment: {
    method: { type: String, required: true },
    totalAmount: {type: Number,required: true}
  },
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Products",
    },
  ],
});

const Order = mongoose.model("Orders", orderModel);
export default Order;
