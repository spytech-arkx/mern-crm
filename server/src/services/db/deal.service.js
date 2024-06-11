// **NOTE** Could combine all of em in one service, but gotta separate concerns
const Deal = require("../../models/deal.model");

async function readDeals(filter, projection, options) {
  try {
    return await Deal.find(filter, projection, options)
      .populate("contact")
      .populate("company")
      .populate("assignee")
      .sort({ createdAt: -1 });
  } catch (err) {
    throw err;
  }
}

async function writeDeals(docs, operation, filters) {
  try {
    const arr = Array.isArray(docs) ? docs : [docs];

    const bulkOps = arr.map((doc) => {
      const bulkOp = {};
      bulkOp[operation] = {
        filter: filters,
        update: operation === "updateOne" ? doc : undefined, // Add update only for updates
        document:
          operation === "insertOne"
            ? { id: `DL-${crypto.randomUUID().split("-")[1].toUpperCase()}`, ...doc }
            : undefined, // Add document only for inserts
      };
      return bulkOp;
    }, {});

    return await Deal.bulkWrite(bulkOps, {
      ordered: true,
    });
  } catch (err) {
    throw err;
  }
}

module.exports = {
  readDeals,
  writeDeals,
};
