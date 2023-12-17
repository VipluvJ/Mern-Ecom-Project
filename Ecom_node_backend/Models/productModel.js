import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    slugname: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    slugbrand: {
      type: String,
      required: true,
    },
    deliveryInformation: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.ObjectId,
      ref: "Category",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    files: {
      type: Array,
    },
    shipping: {
      type: String,
      default: null,
    },
    deleted: {
      type: "boolean",
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Products", productSchema);
