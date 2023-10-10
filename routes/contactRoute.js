import express from "express";
import {
  createContactController,
  deleteContactController,
  getContactController,
} from "../controller/contactController.js";

const router = express.Router();

// Routes

// Create || Post
router.post("/create-contact", createContactController);
// Get
router.get("/get-contact", getContactController);
// Delete
router.delete("/delete-contact/:id", deleteContactController);

export default router;
