// **NOTE** Could combine all of em in one service, but gotta separate concerns
const Company = require('../../models/company.model');

async function readCompanies(filter, projection, options) {
  try {
    return await Company.find(filter, projection, options); // Return the response
  } catch (err) {
    throw err;
  }
}

async function writeCompanies(docs, operation, filters) {
  try {
    const arr = Array.isArray(docs) ? docs : [docs];

    const bulkOps = arr.map((doc) => {
      doc[operation] = {
        filter: filters,
        update: operation === 'updateOne' ? doc : undefined, // Add update only for updates
        document: operation === 'insertOne' ? doc : undefined, // Add document only for inserts
      };
      return doc;
    }, {});

    return await Company.bulkWrite(bulkOps, { ordered: true });
  } catch (err) {
    throw err;
  }
}

module.exports = {
  readCompanies,
  writeCompanies,
};
