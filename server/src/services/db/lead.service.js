// **NOTE** Could combine all of em in one service, but gotta separate concerns
const Lead = require('../../models/lead.model');

async function readLeads(filter, projection, options) {
  try {
    return await Lead.find(filter, projection, options); // Return the response
  } catch (err) {
    throw err;
  }
}

async function writeLeads(docs, operation, filters) {
  try {
    const arr = Array.isArray(docs) ? docs : [docs];

    const bulkOps = arr.reduce((obj, current) => {
      // eslint-disable-next-line no-param-reassign
      obj[operation] = {
        filter: filters,
        update: operation === 'updateOne' ? current : undefined, // Add update only for updates
        document: operation === 'insertOne' ? current : undefined, // Add document only for inserts
      };
      return obj;
    }, {});

    return await Lead.bulkWrite([bulkOps], { ordered: true });
  } catch (err) {
    throw err;
  }
}

module.exports = {
  readLeads,
  writeLeads,
};
