/* eslint-disable no-param-reassign */
const Contact = require("../../models/contact.model");

// mongoDB filters : filter = {_id: id} for example reads by Id
// options : tailable, limit, skip, allowDiskUse, batchSize, readPreference, hint, comment
// projection : Specifies which document fields to include or exclude
// more on : https://mongoosejs.com/docs/api/query.html#Query.prototype.select()
async function readContacts(filter, projection, options) {
  try {
    return await Contact.find(filter, projection, options); // Return the response
  } catch (err) {
    throw err;
  }
}

// write
// docs : documents (or document) to write (or write to)
// operation : insertOne, updateOne, updateMany, replaceOne, deleteOne, and/or deleteMany
// options: session (clientSession), ordered execute writes in order and stop at the first error
async function writeContacts(docs, operation, filters) {
  try {
    const arr = Array.isArray(docs) ? docs : [docs];

    const bulkOps = arr.map((doc) => {
      doc[operation] = {
        filter: filters,
        update: operation === "updateOne" ? doc : undefined, // Add update only for updates
        document:
          operation === "insertOne"
            ? { id: `CT${crypto.randomUUID().split("-")[0].toUpperCase()}`, ...doc }
            : undefined, // Add document only for inserts
      };
      return doc;
    }, {});

    return await Contact.bulkWrite(bulkOps, { ordered: true });
  } catch (err) {
    throw err; // error-handling fl'controller (res, req)
  }
}

module.exports = {
  readContacts,
  writeContacts,
};
