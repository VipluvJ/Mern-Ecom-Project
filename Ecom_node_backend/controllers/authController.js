import userModel from "../Models/userModel.js";
import { comparePass, hashPass } from "../helpers/authHelper.js";
import { generateToken } from "../helpers/authToken.js";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, address, phone, isAdmin } = req.body;
    //validation
    if (!name || !email || !password || !address || !phone) {
      return res.status(401).send({
        error: "Please Fill all the fields",
      });
    }

    //Check existing user
    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res.status(401).send({
        success: false,
        message: "The User already exists",
      });
    }

    //register user

    const hashPassword = await hashPass(password);

    const user = await new userModel({
      name,
      email,
      address,
      phone,
      password: hashPassword,
      isAdmin,
    }).save();
    generateToken(res, user._id);
    return res.status(200).send({
      success: true,
      message: "user registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in registering user",
      error,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.send({
        error: "Invalid mail or password",
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "User Doesn't Exist",
      });
    }
    const match = await comparePass(password, user.password);
    if (!match) {
      return res.status(401).send({
        success: false,
        message: "Invalid mail or password",
      });
    }

    // const token = await JWT.sign({ _id: user._id }, process.env.SECRET, {
    //   expiresIn: "30d",
    // });
    generateToken(res, user._id);
    res.status(200).json({
      success: true,
      message: "Login Successful",
      user: {
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Error in  log in",
      error,
    });
  }
};
export const logoutController = (req, res) => {
  res.cookie("jwt", "", {
    httOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({
    message: "logout successful",
  });
};

export const testController = (req, res) => {
  res.send({
    message: "test successful",
  });
};
