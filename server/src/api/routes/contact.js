const express = require("express");
const validateObjectId = require("../middlewares/validObjectId");
const sanitize = require('../middlewares/sanitizer');
const { getContactById, getContacts, updateContact, deleteContact, softDeleteContact, createContacts } = require("../controllers/contact");
const contactRouter = express.Router();

contactRouter.post("/", sanitize, createContacts);
contactRouter.get("/", getContacts);
contactRouter.get("/:id", validateObjectId , getContactById);
contactRouter.patch("/:id", validateObjectId , sanitize, updateContact);
contactRouter.delete("/:id", validateObjectId , deleteContact);
// contactRouter.delete("/:id", validateObjectId , softDeleteContact);

// contactRouter.get('/analytics')
// contactRouter.get('/analytics/:id')

module.exports = contactRouter;