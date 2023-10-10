import express from "express";
import {
  createSubscriptionController,
  deleteSubscriptionController,
  getSubscriptionController,
} from "../controller/subscriptionController.js";

const router = express.Router();

// Create Subscription Route
router.post("/create-email", createSubscriptionController);

// Create Subscription Route
router.get("/get-email", getSubscriptionController);

// Create Subscription Route
router.delete("/delete-email/:id", deleteSubscriptionController);

// ---------->
export default router;
