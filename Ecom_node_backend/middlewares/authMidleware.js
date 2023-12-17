import JWT from "jsonwebtoken";
import userModelRef from "../Models/userModel.js";

export const verifyLogin = async (req, res, next) => {
  let token;
  token = req.cookies.jwt;
  if (token) {
    try {
      const decode = JWT.verify(token, process.env.SECRET);
      //console.log(req.user);
      req.user = await userModelRef.findById(decode.userId).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, invalid token");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
};

export const verifyAdmin = async (req, res, next) => {
  try {
    const adminUser = await userModelRef.findById(req.user._id);
    if (adminUser.isAdmin === true) {
      console.log({ message: "this is admin" });
      next();
    }
  } catch (error) {
    console.log({ error: error });
  }
};
