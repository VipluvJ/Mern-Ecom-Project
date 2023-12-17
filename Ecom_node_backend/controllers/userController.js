import userModelRef from "../Models/userModel.js";

const addUser = async (req, res) => {
  try {
    // const { name, email, password, address, phone } =  req.body
    // const user = await userModelRef( {name, email, password, address, phone} ).save();

    const user = await userModelRef(req.body).save();
    res.status(201).json({
      message: "added user",
      user,
    });
  } catch (error) {
    res.status(400).json({
      message: "failed",
      error,
    });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const user = await userModelRef.find({});
    res.status(201).json({
      message: "Success",
      user,
    });
  } catch (error) {
    res.status(401).json({
      message: "something went wrong",
      error,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const data = JSON.parse(JSON.stringify(req.body));
    delete data._id;
    const user = await userModelRef.findByIdAndUpdate(
      { _id: req.body._id },
      data,
      { new: true }
    );
    res.status(200).json({
      message: "Success",
      user,
    });
  } catch (error) {
    res.status(400).json({
      message: "something went wrong",
      error,
    });
  }
};
export default addUser;
