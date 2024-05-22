// **NOTE** Could combine all of em in one service, but gotta separate concerns
const Lead = require("../../models/lead.model");

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

    const bulkOps = arr.map((doc) => {
      const bulkOp = {};
      bulkOp[operation] = {
        filter: filters,
        update: operation === "updateOne" ? doc : undefined, // Add update only for updates
        document:
          operation === "insertOne"
            ? { id: `LD${crypto.randomUUID().split("-")[0].toUpperCase()}`, ...doc }
            : undefined, // Add document only for inserts
      };
      return bulkOp;
    }, {});

    return await Lead.bulkWrite(bulkOps, { ordered: true });
  } catch (err) {
    throw err;
  }
}

module.exports = {
  readLeads,
  writeLeads,
};
