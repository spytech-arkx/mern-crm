// **NOTE** Could combine all of em in one service, but gotta separate concerns
const Task = require("../../models/task.model");

async function readTasks(filter, options, projection) {
  try {
    return await Task.find(filter, projection, options); // Return the response
  } catch (err) {
    throw err;
  }
}

async function writeTasks(docs, operation, filters) {
  try {
    const arr = Array.isArray(docs) ? docs : [docs];

    const bulkOps = arr.map((doc) => {
      doc[operation] = {
        filter: filters,
        update: operation === "updateOne" ? doc : undefined, // Add update only for updates
        document:
          operation === "insertOne"
            ? { id: `TASK-${crypto.randomUUID().split("-")[1].toUpperCase()}`, ...doc }
            : undefined, // Add document only for inserts
      };
      return doc;
    }, {});

    return await Task.bulkWrite(bulkOps, { ordered: true });
  } catch (err) {
    throw err;
  }
}

module.exports = {
  readTasks,
  writeTasks,
};
