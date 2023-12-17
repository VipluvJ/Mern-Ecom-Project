import cloudinary from "cloudinary";
import slugify from "slugify";
import categoryModel from "../Models/categoryModel.js";
import productModel from "../Models/productModel.js";
import getDatauri from "../helpers/dataUri.js";

export const createProduct = async (req, res) => {
  console.log(typeof req.files);
  console.log(req.body);

  const urls = [];

  const {
    productName,
    description,
    price,
    quantity,
    shipping,
    brand,
    files,
    category,
    deliveryInformation,
  } = req.body;
  console.log("this is files  " + files);
  for (const file of req.files) {
    const fileUri = getDatauri(file);

    const mycloud = await cloudinary.uploader.upload(fileUri.content);

    console.log(mycloud);
    urls.push(mycloud.secure_url);
  }
  let cat = category.toLowerCase();
  const checkCategory = await categoryModel.findOne({ name: cat });

  try {
    const product = await new productModel({
      productName: productName,
      slugname: slugify(productName),
      brand: brand,
      slugbrand: slugify(brand),
      deliveryInformation: deliveryInformation,
      description: description,
      price: price,
      files: urls,
      category: checkCategory._id,
      quantity: quantity,
      shipping: shipping,
    }).save();
    res.status(201).json({
      success: true,
      checkCategory,
      category,
      cat,
      message: "product created sucessfully",
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllProduct = async (req, res) => {
  try {
    const product = await productModel.find({});
    res.status(201).json({
      message: "Success",
      product,
    });
  } catch (error) {
    res.status(401).json({
      message: "something went wrong",
      error,
    });
  }
};
export const removeProduct = async (req, res) => {
  try {
    const data = JSON.parse(JSON.stringify(req.body));
    delete data._id;
    const product = await productModel.findByIdAndUpdate(
      { _id: req.body._id },
      data,
      { new: true }
    );
    res.status(200).json({
      message: "Success",
      product,
    });
  } catch (error) {
    res.status(400).json({
      message: "something went wrong",
      error,
    });
  }
};
