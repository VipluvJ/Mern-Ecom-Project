import cloudinary from "cloudinary";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import connectDb from "./config/db.js";
import router from "./routes/authRoute.js";
import categoryRouter from "./routes/categoryRoute.js";
import orderRoute from "./routes/orderRoute.js";
import productRoute from "./routes/productRoute.js";

dotenv.config();

//dotEnv Configuration

//Database connection
connectDb();

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//rest  object
const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//routes
app.use("/api/user", router);
app.use("/api/orders", orderRoute);
app.use("/api/category", categoryRouter);
app.use("/api/product", productRoute);

//PORT
const PORT = process.env.PORT || 8080;

//run server
app.listen(PORT, () => {
  console.log(`Server is running on ${process.env.DEV_MODE} on PORT ${PORT}`);
});
