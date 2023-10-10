import subscriptionModel from "../models/subscriptionModel.js";

// Send Subscription Email
export const createSubscriptionController = async (req, res) => {
  try {
    const { email } = req.body;

    // validation
    if (!email) {
      return res.status(500).send({ message: "Email is required" });
    }

    // Existing
    const existing = await subscriptionModel.findOne({ email });
    if (existing) {
      return res
        .status(201)
        .send({ message: "This email is already used for subscription!" });
    }

    // Save
    const subscription = await new subscriptionModel({ email }).save();
    res.status(200).send({
      success: true,
      message: "Email send successfully!",
      subscription,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "Error while sending email!",
      error,
    });
  }
};

// getSubscriptionController
export const getSubscriptionController = async (req, res) => {
  try {
    const emails = await subscriptionModel.find({});
    res.status(200).send({
      success: true,
      message: "List of subscription emails!",
      emails,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while get subscriprtion emails",
      error,
    });
  }
};

// Delete-SubscriptionController
export const deleteSubscriptionController = async (req, res) => {
  try {
    const emails = await subscriptionModel.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      message: "Subscription emails delete successfully!",
      emails,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting subscriprtion emails",
      error,
    });
  }
};
