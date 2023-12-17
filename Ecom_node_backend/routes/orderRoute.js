import express from "express";
import { createOrder, verifyPayment } from "../controllers/orderController.js";

const orderRoute = express.Router();

orderRoute.post("/create-order", createOrder);

orderRoute.post("/verify-payment", verifyPayment);
export default orderRoute;
