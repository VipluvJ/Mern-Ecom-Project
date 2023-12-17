import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: Number,
    },
  ],
  amount: Number,
  razorpay_order_id: String,
  payment_id: String,
  payment_signature: String,
});

export default mongoose.model("Order", orderSchema);
