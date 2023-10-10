import fs from "fs";
import blogModel from "../models/blogModel.js";
// Create-Blog-Controller
export const createBlogController = async (req, res) => {
  try {
    const { title, shortDesc, name, designation, description } = req.fields;
    const { logo } = req.files;
    // Validation
    if (!name || !title || !shortDesc || !designation || !description) {
      return res
        .status(401)
        .send({ message: "Please fill all the fields correctly!" });
    }
    if (!logo || logo.size > 10000000) {
      return res.status(401).send({
        message:
          "Admin logo is required and it's size should be less then 1MB!",
      });
    }

    // Save
    const blog = new blogModel({
      title,
      shortDesc,
      name,
      designation,
      description,
    });
    if (logo) {
      blog.logo.data = fs.readFileSync(logo.path);
      blog.logo.contentType = logo.type;
    }
    await blog.save();
    res.status(200).send({
      success: true,
      message: "Blog created successfully!",
      blog,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while creating Blog!",
      error,
    });
  }
};

// Get Blog Controller
export const getBlogController = async (req, res) => {
  try {
    const blog = await blogModel.find({}).select("-logo");
    res.status(200).send({
      total: blog.length,
      success: true,
      message: "All Blogs list !",
      blog,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting Blog!",
      error,
    });
  }
};

// Update Blog Controller
export const updateBlogController = async (req, res) => {
  try {
    const { title, shortDesc, name, designation, description } = req.fields;
    const { logo } = req.files;
    // Validation
    if (!name || !title || !shortDesc || !designation || !description) {
      return res
        .status(401)
        .send({ message: "Please fill all the fields correctly!" });
    }

    const blog = await blogModel.findByIdAndUpdate(
      req.params.id,
      { title, shortDesc, name, designation, description },
      { new: true }
    );
    if (logo) {
      blog.logo.data = fs.readFileSync(logo.path);
      blog.logo.contentType = logo.type;
    }
    await blog.save();
    res.status(200).send({
      success: true,
      message: "Blog updated successfully!",
      blog,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while updating Blog!",
      error,
    });
  }
};

// Get Single Blog Controller
export const singleBlogController = async (req, res) => {
  try {
    const blog = await blogModel.findById(req.params.id).select("-logo");
    res.status(200).send({
      success: true,
      message: "Single Blog!",
      blog,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting single Blog!",
      error,
    });
  }
};

// Delete Blog Controller
export const deleteBlogController = async (req, res) => {
  try {
    const blog = await blogModel.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      message: "Blog deleted successfully!",
      blog,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting Blog!",
      error,
    });
  }
};

// Auth Image Controller
export const authImageController = async (req, res) => {
  try {
    const blog = await blogModel.findById(req.params.id).select("logo");
    if (blog.logo.data) {
      res.set("Content-type", blog.logo.contentType);
      res.status(200).send(blog.logo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting blog image!",
      error,
    });
  }
};
