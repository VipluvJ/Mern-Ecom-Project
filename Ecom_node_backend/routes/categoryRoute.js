import express from "express";
import {
  addCategory,
  deleteCategory,
  getAllCategory,
  readCategory,
  updateCategory,
} from "../controllers/categoryController.js";
import { verifyAdmin, verifyLogin } from "../middlewares/authMidleware.js";

const categoryRouter = express.Router();

//category Route
categoryRouter.post("/category-route", verifyLogin, verifyAdmin, addCategory);

//Update category
categoryRouter.put(
  "/update-category/:name",
  verifyLogin,
  verifyAdmin,
  updateCategory
);
//read All Category
categoryRouter.get(
  "/all-category",

  getAllCategory
);

// verifyLogin,
//   verifyAdmin,

//read Category
categoryRouter.get(
  "/show-category/:name",
  verifyLogin,
  verifyAdmin,
  readCategory
);

//delete Category
categoryRouter.delete(
  "/delete-category/:name",
  verifyLogin,
  verifyAdmin,
  deleteCategory
);

export default categoryRouter;
