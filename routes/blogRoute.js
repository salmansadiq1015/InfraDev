import express from "express";
import formidable from "express-formidable";
import {
  authImageController,
  createBlogController,
  deleteBlogController,
  getBlogController,
  singleBlogController,
  updateBlogController,
} from "../controller/blogController.js";

const router = express.Router();

// Routes
// Create-Blog-Route
router.post("/create-blog", formidable(), createBlogController);

// // Get All Blogs
router.get("/get-blog", getBlogController);

// // Update Blog
router.put("/update-blog/:id", formidable(), updateBlogController);

// // DeleteBlog
router.delete("/delete-blog/:id", deleteBlogController);

// // Get Single Blog
router.get("/single-blog/:id", singleBlogController);

// // Auth image
router.get("/auth-image/:id", authImageController);

export default router;
