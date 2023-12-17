import slugify from "slugify";
import categoryModel from "../Models/categoryModel.js";

export const addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({
        success: true,
        message: "all fields needed",
      });
    }
    const duplicateCategory = await categoryModel.findOne({ name });

    if (duplicateCategory) {
      return res.status(200).send({
        success: true,
        message: "The category already exists",
      });
    } else {
      const category = await new categoryModel({
        name,
        slug: slugify(name),
      }).save();
      return res.status(201).send({
        success: true,
        message: "Category Added Successfully",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "failed to add category",
      error,
    });
  }
};

export const getAllCategory = async (req, res) => {
  try {
    const categories = await categoryModel.find({});
    res.status(201).json({
      message: "Success",
      categories,
    });
  } catch (error) {
    res.status(401).json({
      message: "something went wrong",
      error,
    });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { name } = req.params;

    const existingName = await categoryModel.findOne({ slug: slugify(name) });
    if (!existingName) {
      return res.status(201).send({
        success: true,
        message: "use create category",
      });
    } else {
      const categoryUpdate = await categoryModel.replaceOne(
        { name: existingName.name, slug: slugify(existingName.name) },
        { name: req.body.name, slug: slugify(req.body.name) }
      );
      return res.status(201).send({
        success: true,
        message: "Category Updated Successfully",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "failed to update category",
      error,
    });
  }
};

export const readCategory = async (req, res) => {
  try {
    const { name } = req.params;

    const existingCategory = await categoryModel.findOne({
      slug: slugify(name),
    });
    if (!existingCategory) {
      return res.status(201).json({
        success: true,
        message: "use create category",
      });
    } else {
      return res.status(201).send({
        existingCategory,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "failed to get category",
      error,
    });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { name } = req.params;

    const existingCategory = await categoryModel.findOne({
      slug: slugify(name),
    });
    if (!existingCategory) {
      return res.status(201).send({
        success: true,
        message: "No category available",
      });
    } else {
      await categoryModel.deleteOne(
        { slug: slugify(existingCategory.name) },
        existingCategory
      );
      return res.status(201).send({
        success: true,
        message: "Category deleted",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "failed to get category",
      error,
    });
  }
};
