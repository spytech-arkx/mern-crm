// **NOTE** Could combine all of em in one service, but gotta separate concerns
const Deal = require('../../models/deal.model');

async function readDeals(filter, projection, options) {
  try {
    return await Deal.find(filter, projection, options); // Return the response
  } catch (err) {
    throw err;
  }
}

async function writeDeals(docs, operation, filters) {
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

    return await Deal.bulkWrite([bulkOps], { ordered: true });
  } catch (err) {
    throw err;
  }
}

module.exports = {
  readDeals,
  writeDeals,
};
