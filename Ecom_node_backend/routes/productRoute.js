import express from "express";
import {
  createProduct,
  getAllProduct,
  removeProduct,
} from "../controllers/productController.js";
import { verifyAdmin, verifyLogin } from "../middlewares/authMidleware.js";
import upload from "../middlewares/multerMiddleware.js";
// import addUser from "../controllers/userController.js";

const productRoute = express.Router();

productRoute.post("/create", verifyLogin, verifyAdmin, upload, createProduct);

productRoute.get("/all-products", getAllProduct);

productRoute.put("/remove-product", removeProduct);

export default productRoute;
//
