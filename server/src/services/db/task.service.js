// **NOTE** Could combine all of em in one service, but gotta separate concerns
const Task = require("../../models/task.model");

async function readTasks(filter, options, projection) {
  try {
    return await Task.find(filter, projection, options).sort({
      createdAt: -1,
    }).populate("owner"); // Return the response
  } catch (err) {
    throw err;
  }
}

async function writeTasks(docs, operation, filters) {
  try {
    const arr = Array.isArray(docs) ? docs : [docs];

    const bulkOps = arr.map((doc) => {
      if (operation === "updateOne") {
        return {
          updateOne: {
            filter: filters,
            update: doc,
          },
        };
      }
      if (operation === "insertOne") {
        return {
          insertOne: {
            document: {
              id: `TASK-${crypto.randomUUID().split("-")[1].toUpperCase()}`,
              ...doc,
            },
          },
        };
      }
      if (operation === "deleteOne") {
        return {
          deleteOne: {
            filter: filters,
          },
        };
      }
      throw new Error(`Unsupported operation: ${operation}`);
    });

    return await Task.bulkWrite(bulkOps, { ordered: true });
  } catch (err) {
    throw err;
  }
}

module.exports = {
  readTasks,
  writeTasks,
};
