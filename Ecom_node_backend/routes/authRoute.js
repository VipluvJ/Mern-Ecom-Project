import express from "express";
// import addUser from "../controllers/userController.js";
import {
  loginUser,
  logoutController,
  registerController,
} from "../controllers/authController.js";
import { getAllUser, updateUser } from "../controllers/userController.js";
import { verifyAdmin, verifyLogin } from "../middlewares/authMidleware.js";

const router = express.Router();

//rest api
router.get("/", (req, res) => {
  res.json({
    message: "success",
  });
});

//addUser
router.post("/register-form", registerController);

//loginRoute
router.post("/login-form", loginUser);

//logoutRoute
router.post("/logout", logoutController);

//AdminRoute
router.post("/admin", verifyLogin, verifyAdmin);

//AdminRoute
router.get("/admin-user-list", verifyLogin, verifyAdmin, getAllUser);

//updateUser
router.put("/update-user-list", verifyLogin, verifyAdmin, updateUser);
// //updateUser
// router.put('/update-user', updateUser)

// //updatePassword
// router.put('/passwor-dupdate', updatePassword)

// //deleteUser
// router.delete('/delete-account', deleteUser)

export default router;
