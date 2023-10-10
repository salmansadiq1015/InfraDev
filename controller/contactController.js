// Create-Contact-Controller

import contactModel from "../models/contactModel.js";

export const createContactController = async (req, res) => {
  try {
    const { name, email, company, phone, message, budget } = req.body;
    // Validation
    if (!name || !email || !company || !phone || !message || !budget) {
      return res
        .status(401)
        .send({ message: "Please fill all the fields correctly!" });
    }

    // Save
    const contacts = await new contactModel({
      name,
      email,
      company,
      phone,
      message,
      budget,
    }).save();
    res.status(200).send({
      success: true,
      message: "Message send successfully!",
      contacts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while sending message!",
      error,
    });
  }
};

// Get-Contact-Controller

export const getContactController = async (req, res) => {
  try {
    const contacts = await contactModel.find({});
    res.status(200).send({
      total: contacts.length,
      success: true,
      message: "Message List!",
      contacts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while get messages list!",
      error,
    });
  }
};

// Delete-Contact-Controller

export const deleteContactController = async (req, res) => {
  try {
    const contact = await contactModel.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      message: "Message delete successfully!",
      contact,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting message!",
      error,
    });
  }
};
