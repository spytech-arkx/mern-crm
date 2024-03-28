const mongoose = require("mongoose");
const dealSchema = require("../../models/deal.model");
exports.getDealsCRUD = async () => {
  try {
    // Retrieve all deals
    const deals = await dealSchema.find({});
    return deals;
  } catch (error) {
    console.error("Error retrieving deals:", error);
  }
};
exports.getDealByIdCRUD = async (id) => {
  try {
    if (mongoose.Types.ObjectId.isValid(id)) {
      const deal = await dealSchema.findById(id);
      return deal;
    }
  } catch (error) {
    console.error(`Error retrieving deal id: ${id}`, error);
  }
};

exports.addDealCRUD = async (content) => {
  try {
    // Retrieve all users
    const newDeal = new dealSchema(content);
    const result = await newDeal.save();
    return result;
  } catch (error) {
    console.error("Error adding deal:", error);
  }
};

exports.updateDealCRUD = async (id, body) => {
  try {
    if (mongoose.Types.ObjectId.isValid(id)) {
      const deal = await dealSchema.findByIdAndUpdate(id, body, {
        new: true,
      });
      return deal;
    }
  } catch (error) {
    console.error("Error updating deal:", error);
  }
};

exports.deleteDealCRUD = async (id) => {
  try {
    const tempId = id;
    if (mongoose.Types.ObjectId.isValid(id)) {
      const deal = await dealSchema.deleteOne({ _id: id });
      return `deal id: ${tempId} was deleted succesfully`;
    }
  } catch (error) {
    console.error("Error deleting deal:", error);
  }
};
