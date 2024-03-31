const Contact = require('../../models/contact');

async function readContacts(filter, projection, options) {
  try {
    const response = await Contact.find(filter, projection, options);
    return response;
  } catch (err) {
    console.log('Error retrieving data:', err);
  }
}

// Note : The save() method returns a promise.
// If save() succeeds, the promise resolves to the document that was saved.
async function writeContacts(body) {
  try {
    if (Array.isArray(body)) {
      const newContacts = await Contact.insertMany(body);
      return newContacts
    } else {
      const newContact = new Contact(body);
      await newContact.save();
      return newContact;
    }
  } catch (err) {
    if (err.name === 'ValidationError') {
      // Handle validation errors specifically
      const { errors } = err;
      // Access specific validation errors using errors object (e.g., errors.name.message)
      throw {
        type: "ContactValidationError",
        message: "Validation errors occurred:",
        errors: errors, // Include specific validation errors
      };
    } else {
      // Handle other errors (e.g., database errors)
      throw {
        type: "ContactSaveError",
        message: err.message || "An error occurred while saving the contact.",
      };
    }
  }
}

module.exports = {
  readContacts,
  writeContacts
};
